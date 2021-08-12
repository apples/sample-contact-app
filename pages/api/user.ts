import { withSession } from '../../lib/session';

export default withSession(async (req, res) => {
    const user = req.session.get('user');

    res.setHeader('Cache-Control', 'no-cache');

    if (user) {
        res.json({
            isLoggedIn: true,
            ...user,
        });
    } else {
        res.json({
            isLoggedIn: false,
        });
    }
});
