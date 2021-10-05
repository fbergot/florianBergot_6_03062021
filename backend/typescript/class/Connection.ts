import { Mongoose } from "mongoose";
import { BasicConnectionInterface } from "../interface/interfaces";

/**
 * For connection database
 * @export
 * @class Connection
 */
export default class Connection implements BasicConnectionInterface{

    connectionOk: string;
    connectionNotOk: string;

    constructor() {
        this.connectionOk = "Connexion mongoDB réussie";
        this.connectionNotOk = "Connexion mongoDB échouée";      
    }

    /**
     * Connection DB
     * @param {string} urlMongoDb
     * @param {{}} options
     * @param {Mongoose} mongoose
     * @returns {Promise<boolean>}
     * @memberof Connection
     */
    async connect(urlMongoDb: string, options: {}, mongoose: Mongoose): Promise<boolean> {
        try {
            await mongoose.connect(urlMongoDb, options)
            console.log(`${this.connectionOk}`);
            return true;
        } catch (e: any) {
            console.error(` ${this.connectionNotOk} : ${e.message}`)
            return false;
        }            
    }
}