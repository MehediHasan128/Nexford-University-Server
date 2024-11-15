import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import httpStatus from 'http-status';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  console.log('base query', query);
  const queryObj = { ...query };
  // regex formate
  // { email: { $regex: query.searchTerm, $options: i }}

  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const studentSearchableFields = ['email', 'name.firstName'];

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  //   Filtering
  const excludeFields = ['searchTerm', 'sort', 'limit'];

  excludeFields.forEach((element) => delete queryObj[element]);
  console.log('Deleted query', queryObj);

  const filterQuery = searchQuery
    .find(queryObj)
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
    .populate('addmistionSemester');

  // sorting
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }

  const sortedQuery = filterQuery.sort(sort);

  //   limiting
  let limit = 1;
  if (query?.limit) {
    limit = query?.limit as number;
  }

  const data = await sortedQuery.limit(limit);

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
