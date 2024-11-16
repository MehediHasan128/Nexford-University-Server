import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { studentSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import httpStatus from 'http-status';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // console.log('base query', query);
  // const queryObj = { ...query };
  // regex formate
  // { email: { $regex: query.searchTerm, $options: i }}

  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const studentSearchableFields = ['email', 'name.firstName'];

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  //   Filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach((element) => delete queryObj[element]);
  // console.log('Deleted query', queryObj);

  // const filterQuery = searchQuery
  //   .find(queryObj)
    // .populate({
    //   path: 'academicDepartment',
    //   populate: { path: 'academicFaculty' },
    // })
    // .populate('addmistionSemester');

  // sorting
  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }

  // const sortedQuery = filterQuery.sort(sort);

  //   limiting & pagination
  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query?.limit) {
  //   limit = Number(query?.limit);
  // };
  // if(query?.page){
  //   page = Number(query?.page);
  //   skip = (page-1)*limit;
  // };


  // const paginateQuery = sortedQuery.skip(skip);


  // const limitQuery = paginateQuery.limit(limit);

  // let fields = '-__v';
  // if(query.fields){
  //   fields = (query.fields as string).split(',').join(' ');
  // };

  // const data = await limitQuery.select(fields);

  // return data;


  const StudentQuery = new QueryBuilder(Student.find(), query).search(studentSearchableFields).filter().sort().paginate().fields();

  const data = await StudentQuery.queryModel;
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
