import { Request, Response } from "express";
import { Model } from "mongoose";
import { SauceInterface } from "../interface/interfaces";

export default class LikeController {

    private model: Model<SauceInterface>;
    private messages: {
        alreadyLiked: string,
        alreadyDisliked: string,
        modifIsOk: string,
        badValue: string
    };

    /**
     *Creates an instance of LikeController.
     * @param {Model<SauceInterface>} model
     * @memberof LikeController
     */
    constructor(model: Model<SauceInterface>) {
        this.model = model;
        this.messages = {
            alreadyLiked: 'This user already liked this sauce',
            alreadyDisliked: 'This user already disliked this sauce',
            modifIsOk: 'Registered modifications ',
            badValue: 'Bad value of \'like\''
        }
    }

    /**
     * For like or dislike item
     * @param {Request} req
     * @param {Response} res
     * @param {CallableFunction} next
     * @memberof ProductController
     */
     public async likeOrDislike(req: Request, res: Response, next: CallableFunction) {
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
     * Refacto for the operation according to case of like 1, -1)
     * @private
     * @param {string} prop
     * @param {string} likesOrDislikes
     * @param {*} product
     * @param {Response} res
     * @param {string} id
     * @throw if (prop !== usersLiked or usersDisliked) || (likesOrDislikes !== "likes" or 'disLikes')
     * @memberof LikeController
     */
    private refactCase(prop: string, likesOrDislikes: string, product: any, res: Response, id: string): void {
        if ((prop === "usersLiked" || prop === "usersDisliked") && (likesOrDislikes === 'likes' || likesOrDislikes === 'disLikes')) {
            if (product[prop].includes(id)) {
                    res.status(409).json({ message: this.messages.alreadyLiked });
                } else {
                    product[likesOrDislikes] += 1;
                    product[prop].push(id);
                    this.saveAndResponse(res, product);
                }
        } else throw Error('Bad argument(s) given (prop or/and likesOrDislikes');
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
    private analyzeLikeState(res: Response, product: any, stateLike: number, id: string) {
        let index: undefined | number;
        switch (stateLike) {
            case 1:
                    this.refactCase('usersLiked', 'likes', product, res, id);
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
                this.refactCase("usersDisliked", 'disLikes', product, res, id);
                break;           
            default:
                res.status(400).json({ message: this.messages.badValue });
        }                             
    }

    /**
     * Save and send response
     * @param {Response} res
     * @param {*} product
     * @memberof LikeController
     */
    private async saveAndResponse(res: Response, product: any): Promise<void> {
             await product.save();
             res.status(200).json({ message: this.messages.modifIsOk });
    }
}