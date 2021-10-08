import { Schema, model } from "mongoose";
import { ModelUserInterface, UserInterface } from '../interface/interfaces';
import * as uniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';

const userSchema = new Schema<ModelUserInterface>(
    {
        email: {
            type: String, 
            required: [true, 'enter an email'],
            unique: true,
            validate: [validator.isEmail, "Enter a valid email"]
        },
        password: {
            type: String,
            required: [true, 'Enter a password'],      
        }
    }
)
userSchema.plugin(uniqueValidator);

export const modelUser = model<UserInterface>('User', userSchema);