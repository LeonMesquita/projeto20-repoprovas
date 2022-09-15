import {faker} from '@faker-js/faker';
import prisma from '../../src/config/database';
import supertest from 'supertest';
import app from '../../src/index';


function authFactory(){
    const password = faker.internet.password(5);

    const authBody = {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password
    }

    return authBody;
}


function wrongAuthFactory(){
    const password = faker.random.words(5);

    const authBody = {
        email: faker.random.words(5),
        password: password,
        confirmPassword: password
    }
    return authBody;
}

export  {authFactory, wrongAuthFactory};