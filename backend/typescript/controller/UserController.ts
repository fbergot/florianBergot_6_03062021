import { Request, Response } from "express";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import { modelUser} from "../model/user";
import { BasicUserController, UserInterface } from "../interface/interfaces";
import { MessagesUserController } from '../enum/enum';
import Bcrypt from "../class/Bcrypt";
import JSONWebToken from "../class/JSONwebToken";

dotenv.config();


export default class UserController implements BasicUserController {

    salt: string;
    instanceBcrypt: Bcrypt;
    instanceJSONWebToken: JSONWebToken;

    constructor(instanceBcrypt: Bcrypt, instanceJSONWebToken: JSONWebToken) {
        this.salt = process.env.SALT ?? "10";
        this.instanceBcrypt = instanceBcrypt;
        this.instanceJSONWebToken = instanceJSONWebToken;

    };
    /**
     * For signup 
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @returns {Promise<boolean>}
     * @memberof UserController
     */
    async signUp(req: Request, res: Response, next: CallableFunction): Promise<boolean> {
        try {
            const hashPassword = await this.instanceBcrypt.bcyptHash(req.body.password, parseInt(this.salt));
            const user = new modelUser(
                {
                    email: req.body.email,
                    password: hashPassword
                }
            );
            await user.save()
            res.status(201).json({ message: MessagesUserController.success });
            return true;
        } catch (e: any) {
            res.status(500).json({ error: e.message });
            return false;
        }        
    }

    /**
     * For login
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @returns {(Promise<boolean|null>)}
     * @memberof UserController
     */
    async login(req: Request, res: Response, next: CallableFunction): Promise<boolean|null> {
        try {
            const filter: mongoose.FilterQuery<UserInterface> = { email: req.body.email };
            var user = await modelUser.findOne(filter);               
            if (!user) {
                res.status(401).json({ message: MessagesUserController.notPresent });
                return null;
            }                           
        } catch (e: any) {
            res.status(500).json({ error: e.message });
            return null;
        }

        try {
            const userPassword:string = user.password;
            if (!await this.instanceBcrypt.bcryptCompare(req.body.password, userPassword)) {
              res.status(401).json({ message: MessagesUserController.badPassword });
              return false;
            }
            const secret = process.env.SECRET ?? "";
            const paylaodSigned = await this.instanceJSONWebToken.signJWT({ userId: user._id }, secret, { expiresIn: '12h' });
            res.status(200).json({ userId: user.id, token: paylaodSigned });
            return true;
        } catch (e: any) {
            res.status(500).json({ error: e.message });
            return null; 
        }
    }
}
