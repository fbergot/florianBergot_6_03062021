import { Schema, model } from "mongoose";
import { ModelSauceInterface, SauceInterface } from '../interface/interfaces';
import validator from 'validator';

const sauceSchema = new Schema<ModelSauceInterface> (
    {
        userId: {
            type: String,
            required: true,
            validate: [validator.isAlphanumeric, 'UserId must be alphanumeric']
        },
        name: {
            type: String,
            required: [true, 'Enter a name for the sauce'],
            validate: [(str: string) => validator.isAlphanumeric(str, 'en-US', { ignore: ' ' }),
                'Sauce name may only have letters and numbers.'],
            minLength:[1, 'Sauce name must have to least 1 character'] 
        },
        manufacturer: { type: String, required: true },
        description: { type: String, required: true },
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

 