import { Request, Response, NextFunction } from 'express';
import { Validator } from '../interface/interfaces';

export default class Sanitize {

    validator: Validator;

    constructor(validator: Validator) {
        this.validator = validator;
    }
    /**
    * Delete left space in string & escape <,> ... in htmlEntities
    * @param {Validator} validator
    * @param {String} data
    */
    sntz(validator: Validator, data: string) {
        return validator.ltrim(validator.escape(data));
    }

    /**
    * Analyze password & email properties for to sanitize auth input
    * @param {Request} req
    * @param {Response} res
    * @param {NextFunction} next
    * @param {Validator} validator
    */
    sanitizerAuth(req: Request, res: Response, next: NextFunction) {
        if (req.body.password) {
            req.body.password = this.sntz(this.validator, req.body.password); 
        }
        if (req.body.email) {
            req.body.email = this.sntz(this.validator, req.body.email);        
        }
        next();
    }

    /**
    * Analyze all properties of object req.body if typeof == string and sanitize
    * @param {Request} req
    * @param {Response} res
    * @param {NextFunction} next
    * @param {Validator} validator
    */
    sanitizeDataSauce(req: Request, res: Response, next: NextFunction) {
        if (req.body.sauce) {
            req.body.sauce = JSON.parse(req.body.sauce);
            for (let key in req.body.sauce) {
                if (typeof key === 'string' && typeof req.body[key] === 'string') {
                    req.body[key] = this.sntz(this.validator, req.body[key]);
                }
            }
        }
        next();       
    }
}










