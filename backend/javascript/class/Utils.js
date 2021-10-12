"use strict";
exports.__esModule = true;
/**
 * Utils
 * @export
 * @class Utils
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Normalize port
     * @param {string} val
     * @returns {(number | boolean)}
     * @memberof Utils
     */
    Utils.prototype.normalizePort = function (val) {
        var port;
        if (typeof val === 'string') {
            if (isNaN(parseInt(val, 10))) {
                throw Error("Invalid port");
            }
            else {
                port = parseInt(val, 10);
            }
        }
        if (port && port >= 0) {
            return port;
        }
        throw Error('Invalid port');
    };
    /**
     * log message of server listening
     * @param {(number|string)} port
     * @memberof Utils
     */
    Utils.prototype.logHandler = function (port, server) {
        var address = server ? server.address() : undefined;
        var bind = typeof address === "string" ? "pipe: " + address : "port: " + port;
        console.log("listening on " + bind);
    };
    /**
     * For treatment errors
     * @param {*} error
     * @param {http.Server} server
     * @memberof Utils
     */
    Utils.prototype.errorHandler = function (error, server, port) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        var address = server.address();
        var bind = typeof address === "string" ? "pipe: " + address : "port: " + port;
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit();
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit();
                break;
            default:
                throw error;
        }
    };
    /**
     * Set the CORS headers
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof Utils
     */
    Utils.prototype.setHeadersCORS = function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    };
    /**
     * Take part after "Bearer " in authorization header
     * @param {express.Request} req
     * @param {string} errorMessage
     * @returns {string}
     * @memberof Utils
     */
    Utils.prototype.getTokenInHeader = function (req, errorMessage) {
        var _a;
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            throw Error("" + errorMessage);
        return token;
    };
    return Utils;
}());
exports["default"] = Utils;
