import { tests } from "@prisma/client";

export type TestData = {
    name: string;
    pdfUrl: string;
    categoryId: number;
    teacherId: number;
    disciplineId: number;
};


export type TestBody = Omit<tests, 'id'>;