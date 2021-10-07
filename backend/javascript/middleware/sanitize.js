"use strict";
exports.__esModule = true;
exports.sanitizeDataSauce = exports.sanitizerAuth = void 0;
/**
 * Function for delete left space and replace '<, >, ', "' in htmlEntities
 * @param {Validator} validator
 * @param {string} data
 * @returns
 */
function sntz(validator, data) {
    return validator.ltrim(validator.escape(data));
}
/**
 * Analyze password & email properties for to sanitize auth input
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {Validator} validator
 */
function sanitizerAuth(req, res, next, validator) {
    if (req.body.password) {
        req.body.password = sntz(validator, req.body.password);
    }
    if (req.body.email) {
        req.body.email = sntz(validator, req.body.email);
    }
    console.log(req.body);
    next();
}
exports.sanitizerAuth = sanitizerAuth;
/**
 * Analyze all properties of object req.body if typeof == string and sanitize
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @param {Validator} validator
 */
function sanitizeDataSauce(req, res, next, validator) {
    if (req.body) {
        for (var key in req.body) {
            if (typeof key === 'string' && typeof req.body[key] === 'string') {
                req.body[key] = sntz(validator, req.body[key]);
            }
        }
    }
    next();
}
exports.sanitizeDataSauce = sanitizeDataSauce;
