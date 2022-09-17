import * as testRepository from '../repositories/testRepository';
import * as teacherRepository from '../repositories/teacherRepository';
import * as teacherDisciplinesRepository from '../repositories/teacherDisciplinesRepository';
import * as disciplineRepository from '../repositories/disciplineRepository';
import { TestData } from '../interfaces/testInterface';




export async function addTest(testData: TestData){
   const teacher = await teacherRepository.getById(testData.teacherId);
   if(!teacher) throw {type: "not_found", message: "Teacher not found"};
   const discipline = await disciplineRepository.findById(testData.disciplineId);
   if(!discipline) throw {type: "not_found", message: "Discipline not found"};
   const teacherDiscipline = await teacherDisciplinesRepository.findById(testData.teacherId, testData.disciplineId);
   if(!teacherDiscipline) throw {type: "not_found", message: "This teacher does not teach this discipline"};


   await testRepository.insert({
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: testData.categoryId,
    teacherDisciplineId: teacherDiscipline.id
   });
}


export async function getTestsByDisciplines(){
   const tests = await testRepository.findByDisciplines();
   console.log(tests)
   return tests;
}


export async function getTestsByTeachers(){
   const tests = await testRepository.findByTeachers();
   console.log(tests)
   return tests;
}