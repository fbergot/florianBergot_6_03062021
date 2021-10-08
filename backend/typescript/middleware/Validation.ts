import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

class Validation {
    yup: any;
    schemaAuth: any;
    schemaProd: any;

    constructor(yup: any) {
        this.schemaAuth = yup.object().shape({
            email: yup.string().required().email(),
            password: yup.string().required().min(4),
        });

        this.schemaProd =  yup.object().shape({
            userId: yup.string().required(),
            name: yup.string().required().max(30),
            manufacturer: yup.string().required().max(30),
            description: yup.string().required().max(100),
            mainPepper: yup.string().required().max(30),
            heat: yup.number().required().integer().min(0).max(10),
            websiteUrl: yup.string().url(),

        });
    }

    async validationAuth(req: Request, res: Response, next: NextFunction) {
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

    async validationProd(req: Request, res: Response, next: NextFunction) {
        let body: any;
        if (req.body.sauce) {
            try {
                body = JSON.parse(req.body.sauce);
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
                res.status(400).json({ error: err.message });
            }
            
        }
 
    }
}


export const valid = new Validation(yup);

   
                
        