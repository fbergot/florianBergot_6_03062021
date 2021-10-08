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
var LikeController = /** @class */ (function () {
    /**
     *Creates an instance of LikeController.
     * @param {Model<SauceInterface>} model
     * @memberof LikeController
     */
    function LikeController(model) {
        this.model = model;
        this.messages = {
            alreadyLiked: 'This user already liked this sauce',
            alreadyDisliked: 'This user already disliked this sauce',
            modifIsOk: 'Registered modifications ',
            badValue: 'Bad value of "like"'
        };
    }
    /**
     * For like or dislike item
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    LikeController.prototype.likeOrDislike = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, id, stateLike, product, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { _id: req.params.id };
                        id = req.body.userId;
                        stateLike = req.body.like;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.model.findOne(filter)];
                    case 2:
                        product = _a.sent();
                        if (product) {
                            this.analyzeLikeState(res, product, stateLike, id);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        res.status(500).json({ error: e_1.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * analyze and operate according to state (0, 1, -1)
     * @param {Response} res
     * @param {*} product
     * @param {number} stateLike
     * @param {string} id
     * @throw if stateLike is not 0, 1, -1
     * @memberof LikeController
     */
    LikeController.prototype.analyzeLikeState = function (res, product, stateLike, id) {
        var index;
        switch (stateLike) {
            case 1:
                if (product.usersLiked.includes(id)) {
                    res.status(409).json({ message: this.messages.alreadyLiked });
                }
                else {
                    product.likes += 1;
                    product.usersLiked.push(id);
                    this.saveAndResponse(res, product);
                }
                break;
            case 0:
                if (product.usersLiked.includes(id)) {
                    product.likes -= 1;
                    index = product.usersLiked.indexOf(id);
                    product.usersLiked.splice(index, 1);
                    this.saveAndResponse(res, product);
                }
                else if (product.usersDisliked.includes(id)) {
                    product.disLikes -= 1;
                    index = product.usersDisliked.indexOf(id);
                    product.usersDisliked.splice(index, 1);
                    this.saveAndResponse(res, product);
                }
                break;
            case -1:
                if (product.usersDisliked.includes(id)) {
                    res.status(409).json({ message: this.messages.alreadyDisliked });
                }
                else {
                    product.disLikes += 1;
                    product.usersDisliked.push(id);
                    this.saveAndResponse(res, product);
                }
                break;
            default:
                res.status(400).json({ message: this.messages.badValue });
        }
    };
    /**
     * Save and send response
     * @param {Response} res
     * @param {*} product
     * @memberof LikeController
     */
    LikeController.prototype.saveAndResponse = function (res, product) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product.save()];
                    case 1:
                        _a.sent();
                        res.status(200).json({ message: this.messages.modifIsOk });
                        return [2 /*return*/];
                }
            });
        });
    };
    return LikeController;
}());
exports["default"] = LikeController;
