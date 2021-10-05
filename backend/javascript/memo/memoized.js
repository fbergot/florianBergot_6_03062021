"use strict";
exports.__esModule = true;
/**
 * Memoized instance of class (with closure)
 * @export
 * @param {classAllTypes} Class
 * @param {{ module: any }} paramsObj
 * @returns {() => classAllTypes}
 */
function memoized(Class, paramsObj) {
    var lastReturn;
    return function () {
        if (lastReturn)
            return lastReturn;
        lastReturn = new Class(paramsObj);
        return lastReturn;
    };
}
exports["default"] = memoized;
