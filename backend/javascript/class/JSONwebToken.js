"use strict";
exports.__esModule = true;
/**
 * For sign & verify token
 * @export
 * @class JSONWebToken
 */
var JSONWebToken = /** @class */ (function () {
    /**
     *Creates an instance of JSONWebToken.
     * @param {typeof jwt} JWT_module
     * @memberof JSONWebToken
     */
    function JSONWebToken(obj) {
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
    JSONWebToken.prototype.signJWT = function (payload, secret, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.JWT.sign(payload, secret, options, function (err, token) {
                err ? reject(err) : resolve(token);
            });
        });
    };
    /**
     * Verify a token
     * @param {string} token
     * @param {(jwt.Secret|jwt.GetPublicKeyOrSecret)} secret
     * @param {*} options
     * @returns {Promise<any>}
     * @memberof JSONWebToken
     */
    JSONWebToken.prototype.verifyJWT = function (token, secret, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.JWT.verify(token, secret, options, function (err, decoded) {
                err ? reject(err) : resolve(decoded);
            });
        });
    };
    return JSONWebToken;
}());
exports["default"] = JSONWebToken;
