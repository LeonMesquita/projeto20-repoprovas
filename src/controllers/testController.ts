import { Request, Response } from "express";
import * as testService from '../services/testService';
import { TestData } from "../interfaces/testInterface";


export async function addTest(req: Request, res: Response){
    const testBody: TestData = req.body;

    await testService.addTest({
        ...testBody,
        categoryId: Number(testBody.categoryId),
        disciplineId: Number(testBody.disciplineId),
        teacherId: Number(testBody.teacherId)
    });
    return res.sendStatus(201);
}