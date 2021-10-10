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

    protected allInstancesMemo: {
        "BcryptMemo": Bcrypt,
        "ConnectionMemo": Connection,
        "CryptoMemo": Crypto,
        "JSONWebTokenMemo": JSONWebToken,
        "UtilsMemo":  Utils
    };

    /**
     *Creates an instance of Factory.
     * @param {callAll} BcryptInstMemo
     * @param {callAll} ConnectionInstMemo
     * @param {callAll} CryptoInstMemo
     * @param {callAll} JSONWebTokenInstMemo
     * @param {callAll} UtilsInstMemo
     * @memberof Factory
     */
    constructor(BcryptInstMemo: () => Bcrypt, ConnectionInstMemo: () => Connection,
        CryptoInstMemo: () => Crypto, JSONWebTokenInstMemo: () => JSONWebToken,
        UtilsInstMemo: () => Utils) {
        
        this.allInstancesMemo = {
            "BcryptMemo": BcryptInstMemo(),
            "ConnectionMemo": ConnectionInstMemo(),
            "CryptoMemo": CryptoInstMemo(),
            "JSONWebTokenMemo": JSONWebTokenInstMemo(),
            "UtilsMemo": UtilsInstMemo(),
        };
    }
    
    public getInstanceMemoized(type: string) {
        if (type in this.allInstancesMemo) {
            return this.allInstancesMemo[type];
        }
        throw Error('The type is not a valid instance memoized');
    }
     
}

export const factory = new Factory (
    memoized(Bcrypt, { module:  bcrypt }),
    memoized(Connection, { module: null }),
    memoized(Crypto, { module: null }),
    memoized(JSONWebToken, { module: jwt }),
    memoized(Utils, { module: null })
)