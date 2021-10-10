import { CryptoInterface } from '../interface/interfaces';

export default class Crypto {
    
    constructor() {}
    /**
     * Generate a random secret
     * @param {*} crypto
     * @param {number} bytes
     * @param {(BufferEncoding | undefined)} tag
     * @returns {Promise<string>}
     * @memberof Crypto
     */
    public async generateSecretRandom(crypto: CryptoInterface, bytes: number, tag:BufferEncoding | undefined):Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(bytes, function (err: any, buffer: Buffer) {
                err ? reject(err) : resolve(buffer.toString(tag));
           });
       })
    }
}
