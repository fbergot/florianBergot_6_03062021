import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import { BasicController, SauceInterface } from '../interface/interfaces';
import * as fs from 'fs';

/**
 * Controller for all routes product
 * @export
 * @class ProductController
 */
export default class ProductController implements BasicController { 

    private model: mongoose.Model<SauceInterface>;
    private messages: {
        registered: string,
        modified: string
    }

    constructor(model: mongoose.Model<SauceInterface>) {
        this.model = model;
        this.messages = {
            registered: 'Object registred with success',
            modified: 'Object modified with success'
        }
    }
    /**
     * find one/all item(s)
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    public find(req: Request, res: Response, next: NextFunction): void {
        this.model.find()
            .then((products) => res.status(200).json(products))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));
    }

    /**
     * For find one item
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    public findOne(req: Request, res: Response, next: NextFunction): void {
        const filter = { _id: req.params.id };
        this.model.findOne(filter)
            .then((product) => res.status(200).json(product))
            .catch((e: mongoose.Error) => res.status(404).json({ error: e.message }));
    }

    /**
     * For save item
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    public save(req: Request, res: Response, next: NextFunction): void {
        const objRequest = req.body.sauce;
        // add missing properties of sauce
        const objWithAllData = {
            ...objRequest,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: [],
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`
        }
        delete objWithAllData._id;
        // new doc
        const docProduct = new this.model(objWithAllData);
        docProduct.save()
            .then(() => res.status(201).json({ message: this.messages.registered }))
            .catch((e: mongoose.Error) => res.status(500).json({ error: e.message }));                
    }

    /**
     * For update item
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    public update(req: Request, res: Response, next: NextFunction): void {
        const filter = { _id: req.params.id };
        // test if new image or not
        const newData = req.file ?
            {
                ...JSON.parse(req.body.thing),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`
            } :
            {
                ...req.body
            };       
        this.model.updateOne(filter, { ...newData , ...filter })
            .then(() => res.status(200).json({ message: this.messages.modified }))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));
    }

    /**
     * For delete item
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    public delete(req: Request, res: Response, next: NextFunction): void {
        const filter = { _id: req.params.id };
        // find
        this.model.findOne(filter)
            .then((product: any) => {
                // find filename & remove file img
                const fileName = product.imageUrl.split('/images/')[1];
                fs.unlink(`images/${fileName}`, (err) => {
                    if (err) throw err;
                    // delete item according to filter
                    this.model.deleteOne(filter)
                        .then((objStatus: any) => res.status(200).json(objStatus))                    
                        .catch((e: mongoose.Error) => res.status(400).json({ message: e.message }));
                });
            })           
            .catch((e: mongoose.Error) => res.status(404).json({ error: e.message }));       
    }
}
