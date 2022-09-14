import prisma from "../config/database";



export async function findById(id: number){
    const discipline = await prisma.disciplines.findUnique({where: {id}});
    return discipline;
}