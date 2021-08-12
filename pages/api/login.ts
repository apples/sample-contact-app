import { withSession } from '../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'
import { hash, validatePassword } from '../../lib/password';

const prisma = new PrismaClient()

export default withSession(async (req, res: NextApiResponse<{ isLoggedIn: boolean, username: string }>) => {
    const { username, password } = await req.body;

    if (!username || !password) {
        res.status(401).end();
        return;
    }

    try {
        const user = await prisma.user.findUnique({ where: { username } });

        // Ensure the user exists at all
        if (!user) {
            console.log(`User ${username} not found.`);
            res.status(401).end();
            return;
        }

        // Check password
        if (!validatePassword(password, user.password_hash, user.password_salt)) {
            console.log(`Password for user ${username} does not match (${password}).`);
            console.log(`  Existing hash: ${user.password_hash}`);
            console.log(`  Incoming hash: ${hash(password, user.password_salt).toString('hex')}`);
            res.status(401).end();
            return;
        }

        req.session.set('user', { username });
        req.session.set('user_secrets', { id: user.id });

        await req.session.save();

        res.json({ isLoggedIn: true, username });
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
});
