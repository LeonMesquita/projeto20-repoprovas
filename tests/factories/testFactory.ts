import {faker} from '@faker-js/faker';
import prisma from '../../src/config/database';
import supertest from 'supertest';
import app from '../../src/index';


function testFactory(){
    const testBody = {
        name: faker.lorem.words(),
        pdfUrl: faker.internet.url(),
        categoryId: 2,
        teacherId: 1,
        disciplineId: 2
    }

    return testBody;
}
// {
//     "name": "segunda prova",
//     "pdfUrl": "placeholder",
//     "categoryId": "2",
//     "teacherId": 1,
//     "disciplineId": 2
//   }

function wrongTestFactory(categoryId: number, teacherId: number, disciplineId: number){
    const testBody = {
        name: faker.lorem.words(),
        pdfUrl: faker.internet.url(),
        categoryId,
        teacherId,
        disciplineId
    }

    return testBody;
}

export  {testFactory, wrongTestFactory};