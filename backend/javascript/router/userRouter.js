"use strict";
exports.__esModule = true;
var express = require("express");
var UserController_1 = require("../controller/UserController");
var Factory_1 = require("../class/Factory");
var router = express.Router();
var controller = new UserController_1["default"](Factory_1.factory.InstanceBcrypt(), Factory_1.factory.InstanceJSONWebToken());
router.post("/signup", function (req, res, next) { return controller.signUp(req, res, next); });
router.post("/login", function (req, res, next) {
    return controller.login(req, res, next);
});
exports["default"] = router;
