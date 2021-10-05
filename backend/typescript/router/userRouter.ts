import * as express from "express";
import Controller from "../controller/UserController";
import { factory } from "../class/Factory";

const router: express.Router = express.Router();
const controller = new Controller(factory.InstanceBcrypt(), factory.InstanceJSONWebToken());

router.post("/signup", (req, res, next) => controller.signUp(req, res, next));
router.post("/login", (req, res, next) => controller.login(req, res, next));

export default router;