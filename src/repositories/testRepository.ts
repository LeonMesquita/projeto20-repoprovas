import prisma from "../config/database";
import { TestBody } from "../interfaces/testInterface";

export async function insert(data: TestBody){
    await prisma.tests.create({data});
}



export async function findByDisciplines(){
    const tests = await prisma.terms.findMany({
        include: {
            disciplines: {
                include: {
                    
                    teachersDisciplines: {
                        include: {
                            tests: {
                                include: {
                                    categories: {}
                                    
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

}



export async function getById(id: number){

}