import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

type Body = {
    userId: string,
    name: string,
    manufacturer: string,
    description: string,
    mainPepper: string,
    heat: number
}

class Validation {
    protected schemaAuth: any;
    protected schemaProd: any;

    /**
     * Creates an instance of Validation.
     * @param {typeof yup} yupM injection dependency
     * @memberof Validation
     */
    constructor(yupM: typeof yup) {
        this.schemaAuth = yupM.object().shape({
            email: yupM.string().required().email(),
            password: yupM.string().required().min(4),
        });

        this.schemaProd = yupM.object().shape({
            userId: yupM.string().required(),
            name: yupM.string().required().max(30),
            manufacturer: yupM.string().required().max(30),
            description: yupM.string().required().max(100),
            mainPepper: yupM.string().required().max(30),
            heat: yupM.number().required().integer().min(0).max(10),
            websiteUrl: yupM.string().url(),

        });
    }

    public async validationAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const stateValid = await this.schemaAuth.validate({
                email: req.body.email,
                password: req.body.password,
            });
            if (stateValid) next();
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
 
    }

    public async validationProd(req: Request, res: Response, next: NextFunction) {
        let body: Body;
        if (req.body.sauce || req.body) {
            try {
                if (req.body.sauce) {
                    // JSON.parse can throw a SyntaxError
                    body = JSON.parse(req.body.sauce);                   
                } else {
                    body = req.body;
                }

                const stateValid = await this.schemaProd.validate({
                    userId: body.userId,
                    name: body.name,
                    manufacturer: body.manufacturer,
                    description: body.description,
                    mainPepper: body.mainPepper,
                    heat: body.heat,
    
                });               
                if (stateValid) next();             
            } catch (err: any) {
                if (err instanceof SyntaxError) {
                    res.status(500).json({ error: err.message });
                }
                res.status(400).json({ error: err.message });
            }           
        }
    }
}


export const valid = new Validation(yup);

   
                
        