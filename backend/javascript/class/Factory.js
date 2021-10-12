"use strict";
exports.__esModule = true;
exports.factory = void 0;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Bcrypt_1 = require("./Bcrypt");
var Connection_1 = require("./Connection");
var Crypto_1 = require("./Crypto");
var JSONwebToken_1 = require("./JSONwebToken");
var Utils_1 = require("./Utils");
var memoized_1 = require("../memo/memoized");
/**
 * Allow get unique instance memoized of class
 * @export
 * @class Factory
 */
var Factory = /** @class */ (function () {
    /**
    * Creates an instance of Factory.
    * @param {() => BcryptInterface} BcryptInstMemo
    * @param {() => BasicConnectionInterface} ConnectionInstMemo
    * @param {() => CryptoInterface} CryptoInstMemo
    * @param {() => JSONWebTokenInterface} JSONWebTokenInstMemo
    * @param {() => Utils} UtilsInstMemo
    * @memberof Factory
    */
    function Factory(BcryptInstMemo, ConnectionInstMemo, CryptoInstMemo, JSONWebTokenInstMemo, UtilsInstMemo) {
        this.allInstancesMemo = {
            BcryptMemo: BcryptInstMemo(),
            ConnectionMemo: ConnectionInstMemo(),
            CryptoMemo: CryptoInstMemo(),
            JSONWebTokenMemo: JSONWebTokenInstMemo(),
            UtilsMemo: UtilsInstMemo()
        };
    }
    Factory.prototype.getInstanceMemoized = function (type) {
        if (type in this.allInstancesMemo) {
            return this.allInstancesMemo[type];
        }
        throw Error("The argument 'type' is not valid");
    };
    return Factory;
}());
exports["default"] = Factory;
exports.factory = new Factory((0, memoized_1["default"])(Bcrypt_1["default"], { module: bcrypt }), (0, memoized_1["default"])(Connection_1["default"], { module: null }), (0, memoized_1["default"])(Crypto_1["default"], { module: null }), (0, memoized_1["default"])(JSONwebToken_1["default"], { module: jwt }), (0, memoized_1["default"])(Utils_1["default"], { module: null }));
