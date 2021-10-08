"use strict";
exports.__esModule = true;
var express = require("express");
var Factory_1 = require("../class/Factory");
var ProductController_1 = require("../controller/ProductController");
var LikeController_1 = require("../controller/LikeController");
var Auth_1 = require("../middleware/Auth");
var multer_config_1 = require("../middleware/multer-config");
var sauce_1 = require("../model/sauce");
var Sanitize_1 = require("../middleware/Sanitize");
var validator_1 = require("validator");
var Validation_1 = require("../middleware/Validation");
var router = express.Router();
var basicController = new ProductController_1["default"](sauce_1.modelSauce);
var likeController = new LikeController_1["default"](sauce_1.modelSauce);
var auth = new Auth_1["default"](Factory_1.factory.InstanceUtils(), Factory_1.factory.InstanceJSONWebToken());
var sanitize = new Sanitize_1["default"](validator_1["default"]);
router.get("/", function (req, res, next) { return auth.verifAuth(req, res, next); }, function (req, res, next) { return basicController.find(req, res, next); });
router.get("/:id", function (req, res, next) { return auth.verifAuth(req, res, next); }, function (req, res, next) { return basicController.findOne(req, res, next); });
router.post("/", function (req, res, next) { return auth.verifAuth(req, res, next); }, multer_config_1["default"], function (req, res, next) { return Validation_1.valid.validationProd(req, res, next); }, function (req, res, next) { return sanitize.sanitizeDataSauce(req, res, next); }, function (req, res, next) { return basicController.save(req, res, next); });
router.post("/:id/like", function (req, res, next) { return auth.verifAuth(req, res, next); }, function (req, res, next) { return sanitize.sanitizeDataSauce(req, res, next); }, function (req, res, next) { return likeController.likeOrDislike(req, res, next); });
router.put("/:id", function (req, res, next) { return auth.verifAuth(req, res, next); }, function (req, res, next) { return Validation_1.valid.validationProd(req, res, next); }, function (req, res, next) { return sanitize.sanitizeDataSauce(req, res, next); }, multer_config_1["default"], function (req, res, next) { return basicController.update(req, res, next); });
router["delete"]("/:id", function (req, res, next) { return auth.verifAuth(req, res, next); }, function (req, res, next) { return basicController["delete"](req, res, next); });
exports["default"] = router;
