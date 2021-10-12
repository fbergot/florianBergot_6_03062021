import * as http from 'http';
import * as dotenv from 'dotenv';
import app from "./app";
import Utils from './class/Utils';
import { factory } from './class/Factory';

dotenv.config();

const server: http.Server = http.createServer(app);
const port = factory
    .getInstanceMemoized<Utils>('UtilsMemo')
    .normalizePort(process.env.PORT || 3000);

server.on("error", (err) => factory.getInstanceMemoized<Utils>('UtilsMemo')
    .errorHandler(err, server, port));

server.on("listening", () => factory.getInstanceMemoized<Utils>('UtilsMemo')
    .logHandler(port, server));

server.listen(port);
