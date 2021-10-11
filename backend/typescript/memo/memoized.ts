import Bcrypt from "../class/Bcrypt";
import Connection from "../class/Connection";
import Crypto from "../class/Crypto";
import JSONWebToken from "../class/JSONwebToken";
import Utils from "../class/Utils";



/**
 * Memoized instance of class (with closure)
 * @export
 * @param {classAllTypes} Class
 * @param {{ module: any }} paramsObj
 * @returns {() => classAllTypes}
 */
export default function memoized<ClassType>(Class: any, paramsObj: { module: any}): () => ClassType {
    let lastReturn: any;

    return function<ClassType> (): ClassType {
        if (lastReturn) return lastReturn;
        lastReturn = new Class(paramsObj);
        return lastReturn;
    }; 
}
