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
var enum_1 = require("../enum/enum");
/**
 * For auth users
 * @static
 * @use enum AuthMessage
 * @use factory
 * @use jwt
 * @use express
 * @export
 * @class Auth
 */
var Auth = /** @class */ (function () {
    function Auth(UtilsInstance, JSONWebTokenInstance) {
        this.UtilsInst = UtilsInstance;
        this.JSONWebTokenInst = JSONWebTokenInstance;
    }
    /**
     * For verif auth (with token)
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @return {Promise<boolean>}
     * @memberof Auth
     */
    Auth.prototype.verifAuth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, userId, decodedToken, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        token = this.UtilsInst.getTokenInHeader(req, enum_1.AuthMessage.errorMessageToken);
                        userId = void 0;
                        return [4 /*yield*/, this.JSONWebTokenInst.verifyJWT(token, process.env.SECRET || "", {})];
                    case 1:
                        decodedToken = _a.sent();
                        if (decodedToken) {
                            userId = decodedToken.userId;
                        }
                        if (req.body.userId && (req.body.userId !== userId)) {
                            throw Error("" + enum_1.AuthMessage.userIdNotCorrect);
                        }
                        else {
                            next();
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.status(401).json({ error: e_1.message || enum_1.AuthMessage.unauthorized });
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Auth;
}());
exports["default"] = Auth;
