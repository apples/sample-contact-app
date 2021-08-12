import { NextApiResponse } from 'next';
import { withUserSession } from '../../lib/session';
import validate from 'deep-email-validator';

export default withUserSession(async (req, res: NextApiResponse<{}>, { user, user_secrets }) => {
    const email = req.query.email as string;

    if (!email) {
        res.status(404).end();
        return;
    }

    const result = await validate({
        email: email,
        sender: email,
        validateRegex: true,
        validateMx: false,
        validateTypo: true,
        validateDisposable: true,
        validateSMTP: false,
    });

    const response = result.valid ?
        { valid: true } :
        {
            valid: false,
            reason: !result.reason ?
                'Unknown reason' :
                result.validators[result.reason as keyof typeof result.validators]?.reason,
        };

    res.setHeader('Cache-Control', 'max-age=3600');
    res.json(response);
});
