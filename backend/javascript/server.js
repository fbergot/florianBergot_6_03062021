"use strict";
exports.__esModule = true;
var http = require("http");
var dotenv = require("dotenv");
var app_1 = require("./app");
var Factory_1 = require("./class/Factory");
dotenv.config();
var server = http.createServer(app_1["default"]);
var port = Factory_1.factory
    .getInstanceMemoized('UtilsMemo')
    .normalizePort(process.env.PORT || 3000);
server.on("error", function (err) { return Factory_1.factory.getInstanceMemoized('UtilsMemo')
    .errorHandler(err, server, port); });
server.on("listening", function () { return Factory_1.factory.getInstanceMemoized('UtilsMemo')
    .logHandler(port, server); });
server.listen(port);
