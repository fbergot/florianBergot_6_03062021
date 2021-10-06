import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { modelSauce } from "../model/sauce";
import { BasicController, SauceInterface } from '../interface/interfaces';
import * as fs from 'fs';

/**
 * Controller for all routes product
 * @export
 * @class ProductController
 */
export default class ProductController implements BasicController { 

    model: mongoose.Model<SauceInterface>;

    constructor(model: mongoose.Model<SauceInterface>) {
        this.model = model;
    }
    /**
     * find one product
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    find(req: Request, res: Response, next: CallableFunction): void {
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
    findOne(req: Request, res: Response, next: CallableFunction): void {
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
    save(req: Request, res: Response, next: CallableFunction): void {
        // with multer, req.body change (req.body.sauce is a string of body)
        const objRequest = JSON.parse(req.body.sauce);
        // add missing properties of sauce
        const objWithAllData = {
            ...objRequest,
            likes: 0,
            disLikes: 0,
            usersLiked: [],
            usersDisliked: [],
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`
        }
        delete objWithAllData._id;
        // new doc
        const docProduct = new this.model(objWithAllData);
        docProduct.save()
            .then(() => res.status(201).json({ message: 'Objet enregistré' }))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));    
    }

    /**
     * For update item
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    update(req: Request, res: Response, next: CallableFunction): void {
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
            .then(() => res.status(200).json({ message: 'Objet modifié' }))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));
    }

    /**
     * For delete
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    delete(req: Request, res: Response, next: CallableFunction): void {
        const filter = { _id: req.params.id };
        // find
        this.model.findOne(filter)
            .then((product: any) => {
                const fileName = product.imageUrl.split('/images/')[1];
                // find filename & remove file
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
