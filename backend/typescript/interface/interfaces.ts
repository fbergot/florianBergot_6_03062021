import { Request, Response, NextFunction } from 'express';
import { Mongoose } from "mongoose";


export interface BasicController {   
    find: (req: Request, res: Response, next: NextFunction) => void,
    findOne: (req: Request, res: Response, next: NextFunction) => void,
    save: (req: Request, res: Response, next: NextFunction) => void,
    update: (req: Request, res: Response, next: NextFunction) => void,
    delete: (req: Request, res: Response, next: NextFunction) => void, 
}

export interface CryptoInterface {
    randomBytes: (bytes: number, callback: (err: any, buffer: Buffer) => void) => void;
}

export interface BasicUserController {
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<boolean>,
    login: (req: Request, res: Response, next: NextFunction) => Promise<boolean|null>
}

export interface PayloadInterface {
    userId: string,
}

export interface BcryptInterface {
    bcryptHash: (data: string | Buffer, salt: number) => Promise<string>,
    bcryptCompare: (plaintextData: string, hash: string) => Promise<boolean>
}

export interface BasicConnectionInterface {
    connect: (urlMongoDb: string, options: {}, mongoose: Mongoose) => Promise<boolean>;
}

export interface ModelUserInterface {
    email: {
        type: string,
        required: [boolean, string],
        unique: boolean,
        validate: [() => boolean, string]
    },
    password: {
        type: string,
        required: [boolean, string],
    }
}

export interface UserInterface {
    email: string,
    password: string
}

export interface ModelSauceInterface {
    userId: { type: string, required: boolean },
    name: { type: string, required: boolean },
    manufacturer: { type: string, required: boolean },
    description: { type: string, required: boolean }
    mainPepper: { type: string, required: boolean },
    imageUrl: { type: string, required: boolean },
    heat: { type: number, required: boolean },
    likes: { type: number, required: boolean },
    dislikes: { type: number, required: boolean },
    usersLiked: { type: Array<string>, required: boolean },
    usersDisliked: { type: Array<string>, required: boolean },
}

export interface SauceInterface {
    userId: string,
    name: string,
    manufacturer: string,
    description: string,
    mainPepper: string,
    imageUrl: string,
    heat: number,
    likes: number,
    dislikes: number,
    usersLiked: Array<string>,
    usersDisliked: Array<string>,
}

export interface Validator {
    ltrim: ((input: string) => string),
    escape: ((input: string) => string)
}
