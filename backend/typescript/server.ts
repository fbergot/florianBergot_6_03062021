import * as http from 'http';
import app from "./app";
import * as dotenv from 'dotenv';
import { factory } from './class/Factory';

dotenv.config();

const server: http.Server = http.createServer(app);
const port = factory
  .getInstanceMemoized('UtilsMemo')
  .normalizePort(process.env.PORT || 3000);

server.on("error", (err) => factory.getInstanceMemoized('UtilsMemo')
    .errorHandler(err, server, port));

server.on("listening", () => factory.getInstanceMemoized('UtilsMemo')
    .logHandler(port, server));

server.listen(port);
