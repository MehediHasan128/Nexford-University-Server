import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (
    academicSemesterNameCodeMapper[payload.semesterName] !==
    payload.semesterCode
  ) {
    throw new Error('Invalid semester Code');
  }
  const data = await AcademicSemester.create(payload);
  return data;
};

const getAllAcademicSemesterFromDB = async () => {
  const data = await AcademicSemester.find();
  return data;
}; 

const getSingleSemesterById = async (id: string) => {
  const data = await AcademicSemester.findById(id);
  return data;
}

const updateAcademicSemester = async(id: string, payload: Partial<TAcademicSemester>) => {
  const data = await AcademicSemester.findByIdAndUpdate(id, payload, {new: true});
  return data;
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleSemesterById,
  updateAcademicSemester
};
