import { NextApiRequest, NextApiResponse } from 'next';
import { Handler, Session, withIronSession } from 'next-iron-session';

export type UserSession = {
    user: {
        username: string;
    };
    user_secrets: {
        id: number;
    };
};

export function withSession(handler: Handler<NextApiRequest, NextApiResponse<any>>) {
    if (!process.env.SECRET_COOKIE_NAME) {
        throw new Error('SECRET_COOKIE_NAME env var is missing!');
    }

    if (!process.env.SECRET_COOKIE_PASSWORD) {
        throw new Error('SECRET_COOKIE_PASSWORD env var is missing!');
    }

    return withIronSession(handler, {
        password: process.env.SECRET_COOKIE_PASSWORD,
        cookieName: process.env.SECRET_COOKIE_NAME,
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
    });
}

export function withUserSession(handler: (req: NextApiRequest, res: NextApiResponse, session: UserSession) => Promise<any>) {
    return withSession(async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
        const user = req.session.get('user');
        const user_secrets = req.session.get('user_secrets');
    
        if (!user || !user_secrets) {
            res.status(401).end();
            return;
        }

        try {
            return handler(req, res, { user, user_secrets });
        } catch (error) {
            console.error(error);
            res.status(500).end();
        }
    });
}
