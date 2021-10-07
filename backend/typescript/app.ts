import * as express from 'express';
import * as mongoose from "mongoose";
import * as ExpressMongoSanitize from 'express-mongo-sanitize';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import ProductRouter from './router/productRouter';
import UserRouter from './router/userRouter';
import { factory } from './class/Factory';

dotenv.config();

// mongo connection
(async (options: { useNewUrlParser: boolean; useUnifiedTopology: boolean }) => {
  const state: boolean = await factory
    .InstanceConnection()
    .connect(process.env.mongoUrl || "", options, mongoose);
  // if no DB connection, exit of current process
  if (!state) process.exit();
})({ useNewUrlParser: true, useUnifiedTopology: true });


// check secret in env or generate if it's absent
if (!process.env.SECRET) {
    factory.InstanceCrypto().generateSecretRandom(crypto, 48, "hex")
      .then((secretRandom: string) => process.env.SECRET = secretRandom)
      .catch((err: Error) => console.error(err.message));
}

const app: express.Application = express();

// base URL
const baseUrlProduct = "/api/sauces";
const baseUrlAuth = "/api/auth";

// connections/ip/time limiter 
const apiLimiter = rateLimit(
    {
        windowMs: (60 * 60 * 1000),
        max: 20,
        message: "Too many accounts created from this IP, please try again after an hour"
    }
);

// add middlewares
app.use(express.json());
app.use(factory.InstanceUtils().setHeadersCORS);
app.use(ExpressMongoSanitize());
app.use("/images", express.static('images'));
app.use(helmet());

// routers
app.use(baseUrlProduct, ProductRouter);
app.use(baseUrlAuth, apiLimiter, UserRouter);


export default app;

