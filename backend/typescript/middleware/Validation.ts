import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

class Validation {
    protected yup: any;
    protected schemaAuth: any;
    protected schemaProd: any;

    constructor(yup: any) {
        this.schemaAuth = yup.object().shape({
            email: yup.string().required().email(),
            password: yup.string().required().min(4),
        });

        this.schemaProd = yup.object().shape({
            userId: yup.string().required(),
            name: yup.string().required().max(30),
            manufacturer: yup.string().required().max(30),
            description: yup.string().required().max(100),
            mainPepper: yup.string().required().max(30),
            heat: yup.number().required().integer().min(0).max(10),
            websiteUrl: yup.string().url(),

        });
    }

    public async validationAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const stateValid = await this.schemaAuth.validate({
                email: req.body.email,
                password: req.body.password,
            })
            if (stateValid) next();
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
 
    }

    public async validationProd(req: Request, res: Response, next: NextFunction) {
        let body: any;
        if (req.body.sauce || req.body) {
            try {
                if (req.body.sauce) {
                    // if JSON.parse throw an , error, is SyntaxError
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
    
                })
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

   
                
        