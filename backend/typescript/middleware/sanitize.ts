import { Request, Response, NextFunction } from 'express';
import { Validator } from '../interface/interfaces';


function sntz(validator: Validator, data: string) {
    return validator.ltrim(validator.escape(data))
}

export function sanitizerAuth(req: Request, res: Response, next: NextFunction, validator: Validator) {
    if (req.body.password) {
        req.body.password = sntz(validator, req.body.password); 
    }
    if (req.body.email) {
        req.body.email = sntz(validator, req.body.email);        
    }
        console.log(req.body);
    next();
}

/**
 * Analyze all properties of object req.body if typeof == string and sanitize
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {Validator} validator
 */
export function sanitizeDataSauce(req: Request, res: Response, next: NextFunction, validator: Validator) {
    if (req.body) {
        for (let key in req.body) {
            if (typeof key === 'string' && typeof req.body[key] === 'string') {
                req.body[key] = sntz(validator, req.body[key]);
            }
        }
    }
    next();       
}


