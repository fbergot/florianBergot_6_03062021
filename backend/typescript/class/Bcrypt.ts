import * as bcrypt from "bcrypt";
import { BcryptInterface } from "../interface/interfaces";

type ModBcrypt = typeof bcrypt;

/**
 * For all brypt operation
 * @export
 * @class Bcrypt
 */
export default class Bcrypt implements BcryptInterface {
    private bcryptModule:  ModBcrypt;


    constructor(obj: { module: ModBcrypt }) {
        this.bcryptModule = obj.module;
    }

    /**
     * Hash data
     * @param {string} data
     * @param {number} salt
     * @returns {Promise<string>}
     * @memberof Bcrypt
     */
    public async bcryptHash(data: string | Buffer, salt: number): Promise<string> {
        return await this.bcryptModule.hash(data, salt);      
    }

    /**
     * Compare plaintext data with hash data
     * @param {string} plaintextData
     * @param {string} hash
     * @returns {Promise<boolean>}
     * @memberof Bcrypt
     */
    public async bcryptCompare(plaintextData: string, hash: string): Promise<boolean> {
            return await this.bcryptModule.compare(plaintextData, hash);       
    }
}