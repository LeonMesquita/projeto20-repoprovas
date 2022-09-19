import prisma from "../config/database";



export async function findById(id: number){
    const category =  await prisma.categories.findUnique({where: {id}});
    return category;
}