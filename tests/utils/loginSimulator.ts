import supertest from "supertest";
import app from "../../src/index";
import prisma from "../../src/config/database";


async function loginSimulator(){
    const authBody = {
        email: "test@gmail.com",
        password: "12345",
        confirmPassword:"12345"
    }
    await supertest(app).post('/signup').send(authBody);
    const response = await supertest(app).post('/signin').send({
        email: authBody.email,
        password: authBody.password
    });

    return response.body.token;
}

export default loginSimulator;