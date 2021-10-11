import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Bcrypt from "./Bcrypt";
import Connection from "./Connection";
import Crypto from "./Crypto";
import JSONWebToken from "./JSONwebToken";
import Utils from "./Utils";
import memoized from "../memo/memoized";
import {
  BcryptInterface,
  BasicConnectionInterface,
  CryptoInterface,
} from "../interface/interfaces";

type AllInstancesMemo = {
        BcryptMemo: BcryptInterface;
        ConnectionMemo: BasicConnectionInterface;
        CryptoMemo: CryptoInterface;
        JSONWebTokenMemo: JSONWebToken;
        UtilsMemo: Utils;
    };
/**
 * Allow get unique instance memoized of class
 * @export
 * @class Factory
 */
export default class Factory {

    protected allInstancesMemo: AllInstancesMemo; 

    /**
    * Creates an instance of Factory.
    * @param {() => BcryptInterface} BcryptInstMemo
    * @param {() => BasicConnectionInterface} ConnectionInstMemo
    * @param {() => CryptoInterface} CryptoInstMemo
    * @param {() => JSONWebToken} JSONWebTokenInstMemo
    * @param {() => Utils} UtilsInstMemo
    * @memberof Factory
    */
    constructor(
        BcryptInstMemo: () => BcryptInterface,
        ConnectionInstMemo: () => BasicConnectionInterface,
        CryptoInstMemo: () => CryptoInterface,
        JSONWebTokenInstMemo: () => JSONWebToken,
        UtilsInstMemo: () => Utils
    ) {
        this.allInstancesMemo = {
            BcryptMemo: BcryptInstMemo(),
            ConnectionMemo: ConnectionInstMemo(),
            CryptoMemo: CryptoInstMemo(),
            JSONWebTokenMemo: JSONWebTokenInstMemo(),
            UtilsMemo: UtilsInstMemo(),
        };
    }

    public getInstanceMemoized<T>(type: string): T {
        if (type in this.allInstancesMemo) {
            return this.allInstancesMemo[type];
        }
        throw Error("The argument 'type' is not a valid");
    }
}

export const factory = new Factory (
    memoized<BcryptInterface>(Bcrypt, { module:  bcrypt }),
    memoized<BasicConnectionInterface>(Connection, { module: null }),
    memoized<CryptoInterface>(Crypto, { module: null }),
    memoized<JSONWebToken>(JSONWebToken, { module: jwt }),
    memoized<Utils>(Utils, { module: null })
)