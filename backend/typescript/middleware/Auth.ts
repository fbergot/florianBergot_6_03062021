import { Request, Response } from 'express';
import { AuthMessage } from '../enum/enum';
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

    unauthorized: string; 
    errorMessageToken: string; 
    userIdNotCorrect: string;
    UtilsInst: Utils;
    JSONWebTokenInst: JSONWebToken;

    constructor(UtilsInstance: Utils, JSONWebTokenInstance: JSONWebToken) {
        this.UtilsInst = UtilsInstance;
        this.JSONWebTokenInst = JSONWebTokenInstance;
        this.unauthorized = "Requête non authentifiée",
        this.errorMessageToken = "Aucun token dans le header authorization ou mal formé",
        this.userIdNotCorrect = "User ID incorrecte"
    }
    /**
     * For verif auth (with token)
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @return {Promise<boolean>}
     * @memberof Auth
     */

    async verifAuth (req: Request, res: Response, next: CallableFunction): Promise<boolean> {
        try {
            const token = this.UtilsInst.getTokenInHeader(req, this.errorMessageToken);
            let userId: undefined | string;
            const decodedToken = await this.JSONWebTokenInst.verifyJWT(token, process.env.SECRET || "", {});           
            if (decodedToken) {
                userId = decodedToken.userId;
            }
            if (req.body.userId && (req.body.userId !== userId)) {
                res.status(403).json({ error: "Request unauthorized" });
            } else {
                next();
                return true;              
            }
        } catch (e: any) {
            res.status(401).json({ error: e.message || this.unauthorized })
            return false;
        }
    }
}