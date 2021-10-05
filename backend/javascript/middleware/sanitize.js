"use strict";
exports.__esModule = true;
var validator_1 = require("validator");
function sanitizer(req, res, next) {
    if (req.body.password && req.body.email) {
        req.body.password = validator_1["default"].ltrim(validator_1["default"].escape(req.body.password));
        req.body.email = validator_1["default"].ltrim(validator_1["default"].escape(req.body.email));
        next();
    }
    else {
        res.status(400).json({ error: new Error('Missing field password and email') });
    }
}
exports["default"] = sanitizer;
