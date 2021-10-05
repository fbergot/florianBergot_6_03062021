import { Schema, model } from "mongoose";


export interface User {
    email: {type: string, required: boolean, unique: boolean},
    password: {type: string, required: boolean}
}

const userSchema = new Schema<User>(
    {
        email: { type: String, required: true, unique: true },
        password: {type: String, required: true}
    }
)

export const modelUser = model('User', userSchema);