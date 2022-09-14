import joi from 'joi';

import { tests } from '@prisma/client';


const testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryId: joi.number().required(),
    teacherId: joi.number().required(),
    disciplineId: joi.number().required()
});


export default testSchema;