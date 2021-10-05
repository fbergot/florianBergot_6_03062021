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
     *Creates an instance of Factory.
     * @param {callAll} BcryptInstMemo
     * @param {callAll} ConnectionInstMemo
     * @param {callAll} CryptoInstMemo
     * @param {callAll} JSONWebTokenInstMemo
     * @param {callAll} UtilsInstMemo
     * @memberof Factory
     */
    function Factory(BcryptInstMemo, ConnectionInstMemo, CryptoInstMemo, JSONWebTokenInstMemo, UtilsInstMemo) {
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
    Factory.prototype.InstanceBcrypt = function () {
        return this.BcryptMemo();
    };
    /**
     * Return an unique instance of Connection
     * @returns {Connection}
     * @memberof Factory
     */
    Factory.prototype.InstanceConnection = function () {
        return this.ConnectionMemo();
    };
    /**
     * Return an unique instance of Crypto
     * @returns {Crypto}
     * @memberof Factory
     */
    Factory.prototype.InstanceCrypto = function () {
        return this.CryptoMemo();
    };
    /**
     * Return an unique instance of JsonWebToken
     * @returns {JSONWebToken}
     * @memberof Factory
     */
    Factory.prototype.InstanceJSONWebToken = function () {
        return this.JSONWebTokenMemo();
    };
    /**
     * Return an unique instance of Utils
     * @returns {Utils}
     * @memberof Factory
     */
    Factory.prototype.InstanceUtils = function () {
        return this.UtilsMemo();
    };
    return Factory;
}());
exports["default"] = Factory;
exports.factory = new Factory((0, memoized_1["default"])(Bcrypt_1["default"], { module: bcrypt }), (0, memoized_1["default"])(Connection_1["default"], { module: null }), (0, memoized_1["default"])(Crypto_1["default"], { module: null }), (0, memoized_1["default"])(JSONwebToken_1["default"], { module: jwt }), (0, memoized_1["default"])(Utils_1["default"], { module: null }));
