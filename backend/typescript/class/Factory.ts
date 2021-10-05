import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Bcrypt from "./Bcrypt";
import Connection from "./Connection";
import Crypto from "./Crypto";
import JSONWebToken from "./JSONwebToken";
import Utils from "./Utils";
import memoized from "../memo/memoized";


// type allClass = Bcrypt | Connection | Crypto | JSONWebToken | Utils;
type classAllTypes = typeof Bcrypt | typeof Connection | typeof Crypto | typeof JSONWebToken | typeof Utils;
type callAll= () => classAllTypes;

/**
 * Allow get unique instance memoized of class
 * @export
 * @class Factory
 */
export default class Factory {

    BcryptMemo: () => any;
    ConnectionMemo: () => any;
    CryptoMemo: () => any;
    JSONWebTokenMemo:  () => any;
    UtilsMemo: () => any;

    /**
     *Creates an instance of Factory.
     * @param {callAll} BcryptInstMemo
     * @param {callAll} ConnectionInstMemo
     * @param {callAll} CryptoInstMemo
     * @param {callAll} JSONWebTokenInstMemo
     * @param {callAll} UtilsInstMemo
     * @memberof Factory
     */
    constructor(BcryptInstMemo: callAll, ConnectionInstMemo: callAll,
        CryptoInstMemo: callAll, JSONWebTokenInstMemo: callAll, UtilsInstMemo: callAll) {
        this.BcryptMemo = BcryptInstMemo;
        this.ConnectionMemo = ConnectionInstMemo;
        this.CryptoMemo = CryptoInstMemo;
        this.JSONWebTokenMemo = JSONWebTokenInstMemo;
        this.UtilsMemo = UtilsInstMemo;
    }
    /**
     * Return an unique instance of Bcrypt
     * @returns {Bcrypt}
     * @memberof Factory
     */
    InstanceBcrypt(): Bcrypt {     
        return this.BcryptMemo();
    }  
    /**
     * Return an unique instance of Connection
     * @returns {Connection}
     * @memberof Factory
     */
    InstanceConnection(): Connection {     
        return this.ConnectionMemo();
    }  
    /**
     * Return an unique instance of Crypto
     * @returns {Crypto}
     * @memberof Factory
     */
    InstanceCrypto(): Crypto {     
        return this.CryptoMemo();
    }  
    /**
     * Return an unique instance of JsonWebToken
     * @returns {JSONWebToken}
     * @memberof Factory
     */
    InstanceJSONWebToken(): JSONWebToken {     
        return this.JSONWebTokenMemo();
    }  
    /**
     * Return an unique instance of Utils
     * @returns {Utils}
     * @memberof Factory
     */
    InstanceUtils(): Utils {     
        return this.UtilsMemo();
    }  
}

export const factory = new Factory (
    memoized(Bcrypt, { module:  bcrypt }),
    memoized(Connection, { module: null }),
    memoized(Crypto, { module: null }),
    memoized(JSONWebToken, { module: jwt }),
    memoized(Utils, { module: null })
)