import supertest from "supertest";
import app from "../src/index";
import loginSimulator from './utils/loginSimulator';


describe('Test get tests Routes', () => {
    it('Must return status 200 if the list of tests ordered by disciplines was returned correctly', async ()=> {
        const token = await loginSimulator();
        const response = await supertest(app).get('/tests/disciplines').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    it('Must return status 200 if the list of tests ordered by teachers was returned correctly', async ()=> {
        const token = await loginSimulator();
        const response = await supertest(app).get('/tests/teachers').set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('Must return status 401 if the authentication token is missing or incorrect',  async () => {
        const response = await supertest(app).get('/tests/disciplines');
        expect(response.status).toBe(401);
    });
    it('Must return status 401 if the authentication token is missing or incorrect',  async () => {
        const response = await supertest(app).get('/tests/teachers');
        expect(response.status).toBe(401);
    });

});