import { Schema, model } from "mongoose";
import { ModelSauceInterface, SauceInterface } from '../interface/interfaces';


const sauceSchema = new Schema<ModelSauceInterface> (
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        manufacturer: { type: String, required: true },
        mainPepper: { type: String, required: true },
        imageUrl: { type: String, required: true },
        heat: { type: Number, required: true },
        likes: { type: Number, required: true },
        disLikes: { type: Number, required: true },
        usersLiked: { type: Array, required: true },
        usersDisliked: { type: Array, required: true },  
    }
);


export const modelSauce = model<SauceInterface>("Sauce", sauceSchema);

