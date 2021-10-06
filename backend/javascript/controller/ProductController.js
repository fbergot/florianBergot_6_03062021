"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var fs = require("fs");
/**
 * Controller for all routes product
 * @export
 * @class ProductController
 */
var ProductController = /** @class */ (function () {
    function ProductController(model) {
        this.model = model;
    }
    /**
     * find one/all item(s)
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController.prototype.find = function (req, res, next) {
        this.model.find()
            .then(function (products) { return res.status(200).json(products); })["catch"](function (e) { return res.status(400).json({ error: e.message }); });
    };
    /**
     * For find one item
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController.prototype.findOne = function (req, res, next) {
        var filter = { _id: req.params.id };
        this.model.findOne(filter)
            .then(function (product) { return res.status(200).json(product); })["catch"](function (e) { return res.status(404).json({ error: e.message }); });
    };
    /**
     * For save item
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController.prototype.save = function (req, res, next) {
        var _a;
        // with multer, req.body change (req.body.sauce is a string of body)
        var objRequest = JSON.parse(req.body.sauce);
        // add missing properties of sauce
        var objWithAllData = __assign(__assign({}, objRequest), { likes: 0, disLikes: 0, usersLiked: [], usersDisliked: [], imageUrl: req.protocol + "://" + req.get('host') + "/images/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) });
        delete objWithAllData._id;
        // new doc
        var docProduct = new this.model(objWithAllData);
        docProduct.save()
            .then(function () { return res.status(201).json({ message: 'Objet enregistré' }); })["catch"](function (e) { return res.status(400).json({ error: e.message }); });
    };
    /**
     * For update item
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController.prototype.update = function (req, res, next) {
        var _a;
        var filter = { _id: req.params.id };
        // test if new image or not
        var newData = req.file ? __assign(__assign({}, JSON.parse(req.body.thing)), { imageUrl: req.protocol + "://" + req.get('host') + "/images/" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) }) : __assign({}, req.body);
        this.model.updateOne(filter, __assign(__assign({}, newData), filter))
            .then(function () { return res.status(200).json({ message: 'Objet modifié' }); })["catch"](function (e) { return res.status(400).json({ error: e.message }); });
    };
    /**
     * For delete
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    ProductController.prototype["delete"] = function (req, res, next) {
        var _this = this;
        var filter = { _id: req.params.id };
        // find
        this.model.findOne(filter)
            .then(function (product) {
            var fileName = product.imageUrl.split('/images/')[1];
            // find filename & remove file
            fs.unlink("images/" + fileName, function (err) {
                if (err)
                    throw err;
                // delete item according to filter
                _this.model.deleteOne(filter)
                    .then(function (objStatus) { return res.status(200).json(objStatus); })["catch"](function (e) { return res.status(400).json({ message: e.message }); });
            });
        })["catch"](function (e) { return res.status(404).json({ error: e.message }); });
    };
    return ProductController;
}());
exports["default"] = ProductController;
