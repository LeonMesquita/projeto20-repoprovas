import { Router } from "express";
import * as testController from '../controllers/testController';
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import testSchema from "../schemas/testSchema";
const testRouter = Router();


testRouter.post('/tests', validateSchema(testSchema), validateToken, testController.addTest);
testRouter.get('/tests/disciplines',validateToken, testController.getTestsByDisciplines);
testRouter.get('/tests/teachers', validateToken, testController.getTestsByTeachers);

export default testRouter;