import * as http from "http";
import * as express from 'express';

/**
 * Utils
 * @export
 * @class Utils
 */
export default class Utils {

    /**
     *Creates an instance of Utils.
     * @memberof Utils
     */
    constructor() {}

    /**
     * Normalize port
     * @param {string} val
     * @returns {(number | boolean)}
     * @memberof Utils
     */
    normalizePort(val: string | number): number {
        let port: undefined | number;
        if (typeof val === 'string') {
            if (isNaN(parseInt(val, 10))) {
                throw Error(`Invalid port`);
            } else {
                port = parseInt(val, 10);
            }           
        }
        if (port && port >= 0) {
          return port;
        }
        throw Error('Invalid port');
    }

    /**
     * log message of server listening
     * @param {(number|string)} port
     * @memberof Utils
     */
    logHandler(port: number, server:http.Server): void {
        const address = server ? server.address() : undefined;
        const bind = typeof address === "string" ? `pipe: ${address}` : `port: ${port}`;
        console.log("listening on " + bind);
    }

    
    /**
     * For treatment errors
     * @param {*} error
     * @param {http.Server} server
     * @memberof Utils
     */
    errorHandler(error: any, server:http.Server, port: number): void {
        if (error.syscall !== 'listen') {
            throw error;
        }      
        var address = server.address();            
        var bind: string = typeof address === "string" ? `pipe: ${address}` : `port: ${port}`;

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit();
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit();
                break;
            default:
                throw error;            
        }      
    }

    /**
     * Set the headers
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {CallableFunction} next
     * @memberof Utils
     */
    setHeadersCORS(req: express.Request, res: express.Response, next: CallableFunction): void {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    }

    /**
     * Take part after "Bearer " in authorization header
     * @param {express.Request} req
     * @param {string} errorMessage
     * @returns {string}
     * @memberof Utils
     */
    getTokenInHeader(req: express.Request, errorMessage: string): string {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw Error(`${errorMessage}`);
        return token;
    }
}