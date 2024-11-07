import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const data = await AcademicSemester.create(payload);
  return data;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
