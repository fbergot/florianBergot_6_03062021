"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var ExpressMongoSanitize = require("express-mongo-sanitize");
var dotenv = require("dotenv");
var crypto = require("crypto");
var rateLimit = require("express-rate-limit");
var helmet = require("helmet");
var productRouter_1 = require("./router/productRouter");
var userRouter_1 = require("./router/userRouter");
var Factory_1 = require("./class/Factory");
dotenv.config();
// mongo connection
(function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var state;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Factory_1.factory
                    .getInstanceMemoized('ConnectionMemo')
                    .connect(process.env.mongoUrl || "", options, mongoose)];
            case 1:
                state = _a.sent();
                // if no DB connection, exit of current process
                if (!state)
                    console.error('Out current process'), process.exit();
                return [2 /*return*/];
        }
    });
}); })({ useNewUrlParser: true, useUnifiedTopology: true });
// check secret in env or generate if it's absent
if (!process.env.SECRET) {
    Factory_1.factory.getInstanceMemoized('CryptoMemo')
        .generateSecretRandom(crypto, 48, "hex")
        .then(function (secretRandom) { return process.env.SECRET = secretRandom; })["catch"](function (err) { return console.error(err.message); });
}
var app = express();
// base URL
var baseUrlProduct = "/api/sauces";
var baseUrlAuth = "/api/auth";
// connections/ip/time limiter 
var apiLimiter = rateLimit({
    windowMs: (60 * 60 * 1000),
    max: 20,
    message: "Too many accounts created from this IP, please try again after an hour"
});
// add middlewares
app.use(express.json());
app.use(Factory_1.factory.getInstanceMemoized('UtilsMemo').setHeadersCORS);
app.use(ExpressMongoSanitize());
app.use("/images", express.static('images'));
app.use(helmet());
// routers
app.use(baseUrlProduct, productRouter_1["default"]);
app.use(baseUrlAuth, apiLimiter, userRouter_1["default"]);
exports["default"] = app;
