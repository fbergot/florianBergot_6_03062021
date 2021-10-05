import * as express from "express";
import { factory } from "../class/Factory";
import Controller from "../controller/ProductController";
import Auth from "../middleware/Auth";
import multer from '../middleware/multer-config';


const router: express.Router = express.Router();
const controller = new Controller;
const auth = new Auth(factory.InstanceUtils(), factory.InstanceJSONWebToken());

router.get(`/`, (req, res, next) => auth.verifAuth(req, res, next), controller.find);
router.get(`/:id`, (req, res, next) => auth.verifAuth(req, res, next), controller.findOne);
router.post(`/`, (req, res, next) => auth.verifAuth(req, res, next), multer, controller.save);
router.put(`/:id`, (req, res, next) => auth.verifAuth(req, res, next), multer, controller.update);
router.delete(`/:id`, (req, res, next) => auth.verifAuth(req, res, next), controller.delete);

export default router;
 



