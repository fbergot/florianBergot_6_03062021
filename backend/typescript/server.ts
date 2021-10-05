import * as http from 'http';
import app from "./app";
import * as dotenv from 'dotenv';
import { factory } from './class/Factory';

dotenv.config();

const server: http.Server = http.createServer(app);
const port = factory.InstanceUtils().normalizePort(process.env.PORT || 3000);

server.on("error", (err) => factory.InstanceUtils().errorHandler(err, server, port));
server.on("listening", () => factory.InstanceUtils().logHandler(port, server));

server.listen(port);
