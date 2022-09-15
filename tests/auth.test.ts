import prisma from "../src/config/database";
import supertest from "supertest";
import app from "../src/index";
import { faker } from "@faker-js/faker";
import {authFactory, wrongAuthFactory} from './factories/authFactory';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`;
})



describe('Test Authentication Route', () => {

    // TESTING SIGNUP ROUTE
  
    it('Must return status 201 if registration is succeeded', async () => {
        const authBody = authFactory();
        const response = await supertest(app).post('/signup').send(authBody);
        expect(response.status).toBe(201);
    });

    it('Must return status 409 if email already exists', async () => {
        const authBody = authFactory();
        await supertest(app).post('/signup').send(authBody);
        const response = await supertest(app).post('/signup').send(authBody);
        expect(response.status).toBe(409);       
    });



    it('Must return status 422 if the signup body is incorrect', async () => {
        const authBody = wrongAuthFactory();
        const response = await supertest(app).post('/signup').send(authBody);
        expect(response.status).toBe(422);
    });

    it('Must return status 401 if confirm password is incorrect', async () => {
        const authBody = authFactory();
        const response = await supertest(app).post('/signup').send({
            ...authBody,
            confirmPassword: faker.internet.password(6)
        });
        expect(response.status).toBe(401);
    });





    // TESTING SIGNIN ROUTE

    it('Must return status 200 if login is correct', async () => {
        const authBody = authFactory();      
        await supertest(app).post('/signup').send(authBody);
        const response = await supertest(app).post('/signin').send({
            email: authBody.email,
            password: authBody.password
        });
        expect(response.status).toBe(200);
    });

    it('Must return status 401 if password or email are incorrect', async () => {
        const authBody = authFactory();
        const response = await supertest(app).post('/signin').send({
            email: authBody.email,
            password: authBody.password
        });
        expect(response.status).toBe(401);
    });


    it('Must return status 422 if the signin body is incorrect', async () => {
        const authBody = wrongAuthFactory();
        const response = await supertest(app).post('/signin').send({
            email: authBody.email,
            password: authBody.password
        });
        expect(response.status).toBe(422);
    });


});