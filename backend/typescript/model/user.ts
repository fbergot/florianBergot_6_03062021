import { Schema, model } from "mongoose";
import { UserInterface } from '../interface/interfaces';

const userSchema = new Schema<UserInterface>(
    {
        email: { type: String, required: true, unique: true },
        password: {type: String, required: true}
    }
)

export const modelUser = model('User', userSchema);