import * as express from "express";
import { factory } from "../class/Factory";
import Controller from "../controller/ProductController";
import Auth from "../middleware/Auth";
import multer from '../middleware/multer-config';
import { modelSauce } from '../model/sauce';

const router: express.Router = express.Router();
const controller = new Controller(modelSauce);
const auth = new Auth(factory.InstanceUtils(), factory.InstanceJSONWebToken());

router.get(`/`, (req, res, next) => auth.verifAuth(req, res, next), (req, res, next) => controller.find(req, res, next));
router.get(`/:id`, (req, res, next) => auth.verifAuth(req, res, next), (req, res, next) => controller.findOne(req, res, next));
router.post(`/`, (req, res, next) => auth.verifAuth(req, res, next), multer, (req, res, next) => controller.save(req, res, next));
router.put(`/:id`, (req, res, next) => auth.verifAuth(req, res, next), multer, (req, res, next) => controller.update(req, res, next));
router.delete(`/:id`, (req, res, next) => auth.verifAuth(req, res, next), (req, res, next) => controller.delete(req, res, next));

export default router;
 
 


