"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var ExpressMongoSanitize = require("express-mongo-sanitize");
var productRouter_1 = require("./router/productRouter");
var userRouter_1 = require("./router/userRouter");
var dotenv = require("dotenv");
var crypto = require("crypto");
var Factory_1 = require("./class/Factory");
dotenv.config();
// check secret in var_env or definition if is absent
if (!process.env.SECRET) {
    Factory_1.factory.InstanceCrypto().generateSecretRandom(crypto, 48, "hex")
        .then(function (secretRandom) { return process.env.SECRET = secretRandom; })["catch"](function (err) { return console.error(err.message); });
}
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
// mongo connection
var state = Factory_1.factory.InstanceConnection().connect(process.env.mongoUrl || "", options, mongoose);
// if no DB connection, exit of process
if (!state)
    process.exit();
var app = express();
// base URL
var baseUrlProduct = "/api/sauces";
var baseUrlAuth = "/api/auth";
app.use(express.json());
app.use(Factory_1.factory.InstanceUtils().setHeadersCORS);
app.use(ExpressMongoSanitize());
app.use("/images", express.static('images'));
// // add routers
app.use(baseUrlProduct, productRouter_1["default"]);
app.use(baseUrlAuth, userRouter_1["default"]);
exports["default"] = app;
