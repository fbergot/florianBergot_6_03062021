import * as express from "express";
import * as mongoose from "mongoose";
import { modelSauce as ProductModel } from "../model/sauce";
import { BasicController } from '../interface/interfaces';
import * as fs from 'fs';

/**
 * Controller for all routes product
 * @export
 * @class ProductController
 */
export default class ProductController implements BasicController { 

    constructor() {}
    /**
     * find one product
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    find(req: express.Request, res: express.Response, next: CallableFunction): void {
        ProductModel.find()
            .then((products) => res.status(200).json(products))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));
    }

    /**
     * For find one item
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    findOne(req: express.Request, res: express.Response, next: CallableFunction): void {
        const filter = { _id: req.params.id };
        ProductModel.findOne(filter)
            .then((product) => res.status(200).json(product))
            .catch((e: mongoose.Error) => res.status(404).json({ error: e.message }));
    }

    /**
     * For save item
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    save(req: express.Request, res: express.Response, next: CallableFunction): void {
        // with multer, req.body change (req.body.thing is a string of body with image in)
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
        const docProduct = new ProductModel(objWithAllData);
        docProduct.save()
            .then(() => res.status(201).json({ message: 'Objet enregistré' }))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));    
    }

    /**
     * For update item
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    update(req: express.Request, res: express.Response, next: CallableFunction): void {
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
        ProductModel.updateOne(filter, { ...newData , ...filter })
            .then(() => res.status(200).json({ message: 'Objet modifié' }))
            .catch((e: mongoose.Error) => res.status(400).json({ error: e.message }));
    }

    /**
     * For delete
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
    delete(req: express.Request, res: express.Response, next: CallableFunction): void {
        const filter = { _id: req.params.id };
        // find
        ProductModel.findOne(filter)
            .then((product: any) => {
                const fileName = product.imageUrl.split('/images/')[1];
                // find filename & remove file
                fs.unlink(`images/${fileName}`, (err) => {
                    if (err) throw err;
                    // delete item according to filter
                    ProductModel.deleteOne(filter)
                        .then(objStatus => res.status(200).json(objStatus))                    
                        .catch((e: mongoose.Error) => res.status(400).json({ message: e.message }));
                });
            })           
            .catch((e: mongoose.Error) => res.status(404).json({ error: e.message }));
        
    }   
}
