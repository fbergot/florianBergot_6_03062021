"use strict";
exports.__esModule = true;
exports.modelUser = void 0;
var mongoose_1 = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var validator_1 = require("validator");
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'enter an email'],
        unique: true,
        validate: [validator_1["default"].isEmail, "Enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Enter a password']
    }
});
userSchema.plugin(uniqueValidator);
exports.modelUser = (0, mongoose_1.model)('User', userSchema);
