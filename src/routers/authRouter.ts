import { Router } from "express";
import * as authController from '../controllers/authController';
import validateSchema from "../middlewares/validateSchema";
import {authSchema, signinSchema} from "../schemas/authSchema";
const authRouter = Router();

authRouter.post('/signup',validateSchema(authSchema), authController.signupUser);
authRouter.post('/signin',validateSchema(signinSchema), authController.signinUser);


export default authRouter;