import * as express from "express";
import Controller from "../controller/UserController";
import { factory } from "../class/Factory";
import validator from "validator";
import Sanitize from "../middleware/Sanitize";
import { valid } from '../middleware/Validation';
import Bcrypt from "../class/Bcrypt";
import JSONWebToken from "../class/JSONwebToken";

const router: express.Router = express.Router();
const sanitize = new Sanitize(validator);
const controller = new Controller(
  factory.getInstanceMemoized<Bcrypt>("BcryptMemo"),
  factory.getInstanceMemoized<JSONWebToken>("JSONWebTokenMemo"));

router.post("/signup",
    (req, res, next) => valid.validationAuth(req, res, next),
    (req, res, next) => sanitize.sanitizerAuth(req, res, next),
    (req, res, next) => controller.signUp(req, res, next));
    
router.post("/login",
    (req, res, next) => valid.validationAuth(req, res, next),
    (req, res, next) => sanitize.sanitizerAuth(req, res, next),
    (req, res, next) => controller.login(req, res, next)
);

export default router;
