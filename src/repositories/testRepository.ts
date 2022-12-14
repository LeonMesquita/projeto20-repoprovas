import prisma from "../config/database";
import { TestBody } from "../interfaces/testInterface";

export async function insert(data: TestBody){
    await prisma.tests.create({data});
}



export async function findByDisciplines(){
    const tests = await prisma.terms.findMany({
        select: {
            id: true,
            number: true,
            disciplines: {
                select: {
                    id: true,
                    name: true,
                    teachersDisciplines: {
                        select: {
                            id: true,
                            tests: {distinct: ['categoryId'],
                            select: {
                                categories: {
                                    select: {
                                        id: true,
                                        name: true,
                                        tests: {
                                            select: {
                                                id: true,
                                                name: true,
                                                pdfUrl: true
                                            }
                                        }
                                    }
                                }
                            }
                        
                        }
                        }
                    }
                }
            }
        }
    });
   return tests; 
}


export async function findByTeachers(){
    const tests = await prisma.teachers.findMany({
        select: {
            id: true,
            name: true,
            teachersDisciplines: {
                select: {
                    id: true,
                    tests: {distinct: ['categoryId'],
                        select: {
                            categories: {
                                select: {
                                    id: true,
                                    name: true,
                                    tests: {
                                        select: {
                                            id: true,
                                            name: true,
                                            pdfUrl: true
                                        }
                                    }
                                }
                            }
                        }
                    
                    }
                }
            }
        }
    });
   return tests; 
}



export async function getById(id: number){

}