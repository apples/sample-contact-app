import { NextApiResponse } from 'next';
import { withUserSession } from '../../lib/session';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default withUserSession(async (req, res: NextApiResponse<{}>, { user, user_secrets }) => {
    const persons = await prisma.person.findMany({
        skip: +req.query.skip,
        take: +req.query.take,
        orderBy: {
            [req.query.orderBy as string]: req.query.order,
        },
    });

    res.setHeader('Cache-Control', 'max-age=3600');
    res.json(persons);
});
