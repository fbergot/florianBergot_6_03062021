"use strict";
exports.__esModule = true;
exports.modelUser = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.modelUser = (0, mongoose_1.model)('User', userSchema);
