import { Request, Response } from "express";
import { Model } from "mongoose";
import { SauceInterface } from "../interface/interfaces";

export default class LikeController {

    model: Model<SauceInterface>;
    messages: {
        alreadyLiked: string,
        alreadyDisliked: string,
        modifIsOk: string
    };

    /**
     *Creates an instance of LikeController.
     * @param {Model<SauceInterface>} model
     * @memberof LikeController
     */
    constructor(model: Model<SauceInterface>) {
        this.model = model;
        this.messages = {
            alreadyLiked: 'Cet utilisateur a déjà liké cette sauce',
            alreadyDisliked: 'Cet utilisateur a déjà disliké cette sauce',
            modifIsOk: 'Modification enregistrée'    
        }
    }

    /**
     * For like or dislike item
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
     async likeOrDislike(req: Request, res: Response, next: CallableFunction) {
        const filter = { _id: req.params.id };
        const id: string = req.body.userId;
        const stateLike: number = req.body.like;
        try {
            const product = await this.model.findOne(filter);
            if (product) {
                this.analyzeLikeState(res, product, stateLike, id);
            }
        } catch (e: any) {
            res.status(500).json({ error: e.message });
        }
    }

    /**
     * analyze and operate according to state (0, 1, -1)
     * @param {Response} res
     * @param {*} product
     * @param {number} stateLike
     * @param {string} id
     * @throw if stateLike is not 0, 1, -1
     * @memberof LikeController
     */
    analyzeLikeState(res: Response, product: any, stateLike: number, id: string) {
        let index: undefined | number;
        switch (stateLike) {
            case 1:
                if (product.usersLiked.includes(id)) {
                    res.status(400).json({ message: this.messages.alreadyLiked });
                } else {
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

                } else if (product.usersDisliked.includes(id)) {
                    product.disLikes -= 1;
                    index = product.usersDisliked.indexOf(id);
                    product.usersDisliked.splice(index, 1);
                    this.saveAndResponse(res, product);
                }
                break;
            case -1:
                if (product.usersDisliked.includes(id)) {
                    res.status(400).json({ message: this.messages.alreadyDisliked });
                } else {
                    product.disLikes += 1;
                    product.usersDisliked.push(id);
                    this.saveAndResponse(res, product);
                }
                break;
            default:
                throw Error('Bad state like, valid :(0, 1, -1)');
        }                             
    }

    /**
     * Save and response
     * @param {Response} res
     * @param {*} product
     * @memberof LikeController
     */
    async saveAndResponse(res: Response, product: any) {
             await product.save();
             res.status(200).json({ message: this.messages.modifIsOk });
    }
}