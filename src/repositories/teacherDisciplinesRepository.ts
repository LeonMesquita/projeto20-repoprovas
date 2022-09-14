import prisma from "../config/database";



export async function findById(teacherId: number, disciplineId: number){
   const teacherDiscipline = await prisma.teachersDisciplines.findFirst({where: {teacherId, disciplineId}});
    return teacherDiscipline;
}