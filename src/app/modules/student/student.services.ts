import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import httpStatus from 'http-status';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // regex formate
  // { email: { $regex: query.searchTerm, $options: i }}

  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }

  const data = await Student.find({
    $or: ['email', 'name.firstName'].map((field) => ({
        [field]: {$regex: searchTerm, $options: 'i'}
    }))
  })
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
    .populate('addmistionSemester');
  return data;
};

const getSingleStudentFromBD = async (studentId: string) => {
  const data = await Student.findOne({ id: studentId })
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
    .populate('addmistionSemester');
  if (!data) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This student is dose not exists in our dataBase',
    );
  }
  return data;
};

const updateStudentIntoDB = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  const data = await Student.findOneAndUpdate({ id: studentId }, payload, {
    new: true,
  });
  return data;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromBD,
  updateStudentIntoDB,
};
