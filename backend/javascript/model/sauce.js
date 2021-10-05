"use strict";
exports.__esModule = true;
exports.modelSauce = void 0;
var mongoose_1 = require("mongoose");
var sauceSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    disLikes: { type: Number, required: true },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true }
});
exports.modelSauce = (0, mongoose_1.model)("Sauce", sauceSchema);
