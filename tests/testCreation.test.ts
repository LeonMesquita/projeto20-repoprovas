import prisma from "../src/config/database";
import supertest from "supertest";
import app from "../src/index";
import { faker } from "@faker-js/faker";
import {testFactory, wrongTestFactory} from './factories/testFactory';
import loginSimulator from './utils/loginSimulator';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests`;
    await prisma.$executeRaw`TRUNCATE TABLE users`;
});



describe('Test Tests Routes', () => {

    it('Must return status 404 if the discipline, teacher or category was not found',  async () => {
        const test = wrongTestFactory(999, 999, 999);
        const token = await loginSimulator();
        const response = await supertest(app).post('/tests').set('Authorization', 'Bearer ' + token).send(test);
        expect(response.status).toBe(404);
    });



    it('Must return status 404 if the teacher does not teach this discipline',  async () => {

        const test = wrongTestFactory(2, 2, 1);
        const token = await loginSimulator();
        console.log(token)
        const response = await supertest(app).post('/tests').set('Authorization', 'Bearer ' + token).send(test);
        expect(response.status).toBe(404);
    });



    it('Must return status 401 if the authentication token is missing or incorrect',  async () => {
        const test = testFactory();
        const response = await supertest(app).post('/tests').send(test);
        expect(response.status).toBe(401);
    });




    it('Must return status 201 if the test creation is correct',  async () => {
        const test = testFactory();
        const token = await loginSimulator();
        const response = await supertest(app).post('/tests').set('Authorization', 'Bearer ' + token).send(test);
        expect(response.status).toBe(201);
    });


    it('Must return status 422 if any param of the body is missing or incorrect',  async () => {
        const test = {
            name: '',
            pdfUrl: '',
            categoryId: '',
            teacherId: '',
            disciplineId: ''
        }
        const token = await loginSimulator();
        const response = await supertest(app).post('/tests').set('Authorization', 'Bearer ' + token).send(test);
        expect(response.status).toBe(422);
    });

    /// falta testar o formato do body


});


