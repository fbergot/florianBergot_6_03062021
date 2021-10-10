import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import { modelUser} from "../model/user";
import { BasicUserController, UserInterface } from "../interface/interfaces";
import Bcrypt from "../class/Bcrypt";
import JSONWebToken from "../class/JSONwebToken";

dotenv.config();


/**
 * @use enum MessageUserController
 * @export
 * @class UserController
 * @implements {BasicUserController}
 */
export default class UserController implements BasicUserController {

    private salt: string;
    private instanceBcrypt: Bcrypt;
    private instanceJSONWebToken: JSONWebToken;
    private success: string; 
    private notPresent: string;
    private badPassword: string;

    /**
     *Creates an instance of UserController.
     * @param {Bcrypt} instanceBcrypt
     * @param {JSONWebToken} instanceJSONWebToken
     * @memberof UserController
     */
    constructor(instanceBcrypt: Bcrypt, instanceJSONWebToken: JSONWebToken) {
        this.salt = process.env.SALT ?? "10";
        this.instanceBcrypt = instanceBcrypt;
        this.instanceJSONWebToken = instanceJSONWebToken;
        this.success = 'User created',
        this.notPresent = 'This user not exist',
        this.badPassword = 'Password is incorrect'

    };
    /**
     * For signup 
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @returns {Promise<boolean>}
     * @memberof UserController
     */
    public async signUp(req: Request, res: Response, next: NextFunction): Promise<boolean> {
        try {
            const hashPassword = await this.instanceBcrypt.bcyptHash(req.body.password, parseInt(this.salt));
            const user = new modelUser(
                {
                    email: req.body.email,
                    password: hashPassword
                }
            );
            await user.save()
            res.status(201).json({ message: this.success });
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
    public async login(req: Request, res: Response, next: NextFunction): Promise<boolean|null> {
        try {
            const filter: mongoose.FilterQuery<UserInterface> = { email: req.body.email };
            var user = await modelUser.findOne(filter);               
            if (!user) {
                res.status(401).json({ message: this.notPresent });
                return null;
            }                           
        } catch (e: any) {
            res.status(500).json({ error: e.message });
            return null;
        }

        try {
            const userPassword: string = user.password;
            if (!await this.instanceBcrypt.bcryptCompare(req.body.password, userPassword)) {
              res.status(401).json({ message: this.badPassword });
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
