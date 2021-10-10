import * as jwt from 'jsonwebtoken';
import { PayloadInterface } from '../interface/interfaces';


/**
 * For sign & verify token
 * @export
 * @class JSONWebToken
 */
export default class JSONWebToken {

    protected JWT: typeof jwt;

    /**
     *Creates an instance of JSONWebToken.
     * @param {typeof jwt} JWT_module
     * @memberof JSONWebToken
     */
    constructor(obj: { module: any }) {
        this.JWT = obj.module;
    }
    
    /**
     * sign a token
     * @param {Payload} payload
     * @param {string} secret
     * @param {*} options
     * @returns {Promise<any>}
     * @memberof JSONWebToken
     */
    public signJWT(payload: PayloadInterface, secret: string, options: jwt.SignOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            this.JWT.sign(payload, secret, options, (err, token) => {
                err ? reject(err) : resolve(token);
            })
        })
    }

    /**
     * Verify a token
     * @param {string} token
     * @param {(jwt.Secret|jwt.GetPublicKeyOrSecret)} secret
     * @param {*} options
     * @returns {Promise<any>}
     * @memberof JSONWebToken
     */
    public verifyJWT(token: string, secret: jwt.Secret | jwt.GetPublicKeyOrSecret, options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.JWT.verify(token, secret, options, (err, decoded) => {
                err ? reject(err) : resolve(decoded);
            })
        })
    }
}
