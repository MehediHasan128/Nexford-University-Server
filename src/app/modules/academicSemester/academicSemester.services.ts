import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

  if(academicSemesterNameCodeMapper[payload.semesterName] !== payload.semesterCode){
    throw new Error("Invalid semester Code")
  }
  const data = await AcademicSemester.create(payload);
  return data;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
