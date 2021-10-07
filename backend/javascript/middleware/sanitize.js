"use strict";
exports.__esModule = true;
exports.sanitizerAuth = void 0;
var validator_1 = require("validator");
function sanitizerAuth(req, res, next) {
    if (req.body.password && req.body.email) {
        req.body.password = validator_1["default"].ltrim(validator_1["default"].escape(req.body.password));
        req.body.email = validator_1["default"].ltrim(validator_1["default"].escape(req.body.email));
        if (!validator_1["default"].isEmail(req.body.email)) {
            res.status(400).json({ error: 'Email incorrect' });
        }
        else if (!validator_1["default"].isAlphanumeric(req.body.password)) {
            res.status(400).json({ error: 'Password incorrect' });
        }
        else {
            next();
        }
    }
    else {
        res.status(400).json({ error: 'Missing field password and email' });
    }
}
exports.sanitizerAuth = sanitizerAuth;
