"use strict";
exports.__esModule = true;
var Sanitize = /** @class */ (function () {
    function Sanitize(validator) {
        this.validator = validator;
    }
    /**
    * Delete left space in string & escape <,> ... in htmlEntities
    * @param {Validator} validator
    * @param {String} data
    */
    Sanitize.prototype.sntz = function (validator, data) {
        return validator.ltrim(validator.escape(data));
    };
    /**
    * Analyze password & email properties for to sanitize auth inputs
    * @param {Request} req
    * @param {Response} res
    * @param {NextFunction} next
    */
    Sanitize.prototype.sanitizerAuth = function (req, res, next) {
        if (req.body.password) {
            req.body.password = this.sntz(this.validator, req.body.password);
        }
        if (req.body.email) {
            req.body.email = this.sntz(this.validator, req.body.email);
        }
        next();
    };
    /**
    * Analyze all properties of object and sanitize
    * @param {Request} req
    * @param {Response} res
    * @param {NextFunction} next
    */
    Sanitize.prototype.sanitizeDataSauce = function (req, res, next) {
        if (req.body.sauce) {
            try {
                req.body.sauce = JSON.parse(req.body.sauce);
                for (var key in req.body.sauce) {
                    if (typeof req.body[key] === 'string') {
                        req.body[key] = this.sntz(this.validator, req.body[key]);
                    }
                }
            }
            catch (err) {
                res.status(500).json({ error: err.message });
            }
        }
        next();
    };
    return Sanitize;
}());
exports["default"] = Sanitize;
