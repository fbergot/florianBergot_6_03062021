"use strict";
exports.__esModule = true;
exports.modelSauce = void 0;
var mongoose_1 = require("mongoose");
var validator_1 = require("validator");
var sauceSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        validate: [validator_1["default"].isAlphanumeric, 'UserId must be alphanumeric']
    },
    name: {
        type: String,
        required: [true, 'Enter a name for the sauce'],
        validate: [function (str) { return validator_1["default"].isAlphanumeric(str, 'en-US', { ignore: ' ' }); },
            'Sauce name may only have letters and numbers.'],
        minLength: [1, 'Sauce name must have to least 1 character']
    },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    disLikes: { type: Number, required: true },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true }
});
exports.modelSauce = (0, mongoose_1.model)("Sauce", sauceSchema);
