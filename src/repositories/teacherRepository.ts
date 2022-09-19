import prisma from "../config/database";



export async function findById(id: number){
    const teacher = await prisma.teachers.findUnique({where: {id}});
    return teacher;
}