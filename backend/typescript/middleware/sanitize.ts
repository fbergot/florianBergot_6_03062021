import validator from 'validator';
import { Request, Response } from 'express';

function sanitizer(req: Request, res: Response, next: CallableFunction) {
    if (req.body.password && req.body.email) {
        req.body.password = validator.ltrim(validator.escape(req.body.password));
        req.body.email = validator.ltrim(validator.escape(req.body.email));
        next();
    } else {
        res.status(400).json({error: new Error('Missing field password and email')})
    }
}
export default sanitizer;