import Bcrypt from "../class/Bcrypt";
import Connection from "../class/Connection";
import Crypto from "../class/Crypto";
import JSONWebToken from "../class/JSONwebToken";
import Utils from "../class/Utils";

type classAllTypes = typeof Bcrypt | typeof Connection | typeof Crypto | typeof JSONWebToken | typeof Utils;
    
/**
 * Memoized instance of class (with closure)
 * @export
 * @param {classAllTypes} Class
 * @param {{ module: any }} paramsObj
 * @returns {() => classAllTypes}
 */
export default function memoized(Class: any, paramsObj: { module: any }): () => any {
    let lastReturn: any;

    return function () {
        if (lastReturn) return lastReturn;
        lastReturn = new Class(paramsObj);
        return lastReturn;
    }; 
}
