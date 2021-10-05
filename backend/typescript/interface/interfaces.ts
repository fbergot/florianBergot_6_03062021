import { Request, Response } from 'express';
import { Mongoose } from "mongoose";


export interface BasicController {   
    find: (req: Request, res: Response, next: CallableFunction) => void,
    findOne: (req: Request, res: Response, next: CallableFunction) => void,
    save: (req: Request, res: Response, next: CallableFunction) => void,
    update: (req: Request, res: Response, next: CallableFunction) => void,
    delete: (req: Request, res: Response, next: CallableFunction) => void, 
}

export interface CryptoInterface {
    randomBytes: (bytes: number, callback: (err: any, buffer: Buffer) => void) => void;
}

export interface BasicUserController {
    signUp: (req: Request, res: Response, next: CallableFunction) => Promise<boolean>,
    login: (req: Request, res: Response, next: CallableFunction) => Promise<boolean|null>
}

export interface PayloadInterface {
    userId: string,
}

export interface BcryptInterface {
    bcyptHash: (data: string | Buffer, salt: number) => Promise<string>,
    bcryptCompare: (plaintextData: string, hash: string) => Promise<boolean>
}

export interface BasicConnectionInterface {
    connect: (urlMongoDb: string, options: {}, mongoose: Mongoose) => Promise<boolean>;
}

export interface UserInterface {
    email: {type: string, required: boolean, unique: boolean},
    password: {type: string, required: boolean}
}

export interface SauceInterface {
    userId: { type: string, required: boolean },
    name: { type: string, required: boolean },
    manufacturer: { type: string, required: boolean },
    mainPepper: { type: string, required: boolean },
    imageUrl: { type: string, required: boolean },
    heat: { type: number, required: boolean },
    likes: { type: number, required: boolean },
    disLikes: { type: number, required: boolean },
    usersLiked: { type: Array<string>, required: boolean },
    usersDisliked: { type: Array<string>, required: boolean },
}

