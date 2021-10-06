import * as express from "express";
import { factory } from "../class/Factory";
import Controller from "../controller/ProductController";
import LikeController from "../controller/LikeController";
import Auth from "../middleware/Auth";
import multer from '../middleware/multer-config';
import { modelSauce } from '../model/sauce';

const router: express.Router = express.Router();
const basicController = new Controller(modelSauce);
const likeController = new LikeController(modelSauce);
const auth = new Auth(factory.InstanceUtils(), factory.InstanceJSONWebToken());

router.get(`/`,
    (req, res, next) => auth.verifAuth(req, res, next),
    (req, res, next) => basicController.find(req, res, next));
router.get(`/:id`,
    (req, res, next) => auth.verifAuth(req, res, next),
    (req, res, next) => basicController.findOne(req, res, next));
router.post(`/`,
    (req, res, next) => auth.verifAuth(req, res, next),
    multer, (req, res, next) => basicController.save(req, res, next));
router.post(`/:id/like`,
    (req, res, next) => auth.verifAuth(req, res, next),
    (req, res, next) => likeController.likeOrDislike(req, res, next));
router.put(`/:id`,
    (req, res, next) => auth.verifAuth(req, res, next),
    multer, (req, res, next) => basicController.update(req, res, next));
router.delete(`/:id`,
    (req, res, next) => auth.verifAuth(req, res, next),
    (req, res, next) => basicController.delete(req, res, next));

export default router;
 
 


