import { NextApiResponse } from 'next';
import { withUserSession } from '../../lib/session';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default withUserSession(async (req, res: NextApiResponse<{}>, { user, user_secrets }) => {
    const addresses = await prisma.address.findMany({
        where: {
            person_id: +req.query.person_id,
        },
        orderBy: {
            name: 'desc',
        },
    });

    res.setHeader('Cache-Control', 'max-age=3600');
    res.json(addresses);
});
