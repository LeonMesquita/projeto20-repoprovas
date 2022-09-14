import prisma from "../config/database";
import { TestBody } from "../interfaces/testInterface";

export async function insert(data: TestBody){
    await prisma.tests.create({data});
}



export async function getById(id: number){

}