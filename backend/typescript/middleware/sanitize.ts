import validator from 'validator';
import { Request, Response } from 'express';

export function sanitizerAuth(req: Request, res: Response, next: CallableFunction) {
    if (req.body.password && req.body.email) {
        req.body.password = validator.ltrim(validator.escape(req.body.password));
        req.body.email = validator.ltrim(validator.escape(req.body.email));
        
        if (!validator.isEmail(req.body.email)) {
            res.status(400).json({ error: 'Email incorrect'});            
        } else if(!validator.isAlphanumeric(req.body.password)) {
            res.status(400).json({ error: 'Password incorrect'});            
        } else {           
            next();
        }
    } else {
        res.status(400).json({ error: 'Missing field password and email' });
    }
}


