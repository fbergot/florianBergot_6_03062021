import { Request, Response } from 'express';
import Utils from '../class/Utils';
import JSONWebToken from '../class/JSONwebToken';

/**
 * For auth users
 * @static
 * @use enum AuthMessage
 * @use factory
 * @use jwt
 * @use express
 * @export
 * @class Auth
 */
export default class Auth {

    UtilsInst: Utils;
    JSONWebTokenInst: JSONWebToken;
    messages: {
        unauthorized: string; 
        errorMessageToken: string; 
    }

    constructor(UtilsInstance: Utils, JSONWebTokenInstance: JSONWebToken) {
        this.UtilsInst = UtilsInstance;
        this.JSONWebTokenInst = JSONWebTokenInstance;
        this.messages = {
            unauthorized : "Request unauthorized",
            errorMessageToken : "Missing token or poorly formed",
        }
    }
    /**
     * For verif auth (with token)
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @return {Promise<boolean>}
     * @memberof Auth
     */

    async verifAuth (req: Request, res: Response, next: CallableFunction): Promise<boolean|null> {
        try {
            const token = this.UtilsInst.getTokenInHeader(req, this.messages.errorMessageToken);
            let userId: undefined | string;
            const decodedToken = await this.JSONWebTokenInst.verifyJWT(token, process.env.SECRET || "", {});           
            if (decodedToken) {
                userId = decodedToken.userId;
            }
            if (req.body.userId && (req.body.userId !== userId)) {
                res.status(403).json({ error: this.messages.unauthorized });
                return false;
            } else {
                next();
                return true;              
            }
        } catch (e: any) {
            res.status(401).json({ error: e.message})
            return null;
        }
    }
}