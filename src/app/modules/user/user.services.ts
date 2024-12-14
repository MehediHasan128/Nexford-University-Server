import config from '../../config';
import { User } from './user.model';
import httpStatus from 'http-status';
import { startSession } from 'mongoose';
import { TUser } from './user.interface';
import AppError from '../../errors/AppError';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';
import { TFaculty } from '../faculty/faculty.interface';
import { TStudent } from '../student/student.interface';
import {
  generatedAdminId,
  generatedFacultyId,
  generatedStudentId,
} from './user.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import jwt, { JwtPayload } from 'jsonwebtoken';

const createStudentUserIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_pass as string);

  // Set student email
  userData.email = payload.email;

  // Set student role
  userData.role = 'student';

  // Start a session
  const session = await startSession();

  try {
    // start session
    session.startTransaction();

    // auto denerated student id
    const addmissionSemester = await AcademicSemester.findById(
      payload.addmistionSemester,
    );
    const academicDepartment = await AcademicDepartment.findById(
      payload.academicDepartment,
    );
    const departmentIdString = payload.academicDepartment.toString();
    userData.id = await generatedStudentId(
      addmissionSemester as TAcademicSemester,
      academicDepartment as TAcademicDepartment,
      departmentIdString,
    );

    // Create user into DB
    const newUser = await User.create([userData], { session });

    // Create a student (transaction-1)
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create student into DB (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    await session.endSession();
  }
};

const createFacultyUserIntoDB = async (password: string, payload: TFaculty) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_faculty_pass as string);

  // Set faculty email
  userData.email = payload.email;

  // Set student role
  userData.role = 'faculty';

  const session = await startSession();

  try {
    session.startTransaction();
    // Auto generated faculty id
    const academicDepartment = await AcademicDepartment.findById(
      payload.academicDepartment,
    );
    userData.id = await generatedFacultyId(
      academicDepartment as TAcademicDepartment,
    );

    // Create user into DB
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create faculty');
    }
    payload.user = newUser[0]._id;
    payload.id = newUser[0].id;

    // Create faculty into DB
    const newFaculty = await Faculty.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    await session.endSession();
  }
};

const createAdminUserIntoDB = async (password: string, payload: TAdmin) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_admin_pass as string);

  // Set admin email
  userData.email = payload.email;

  // Set student role
  userData.role = 'admin';

  // Start a session
  const session = await startSession();

  try {
    // Start transiction
    session.startTransaction();

    const department = await AcademicDepartment.findById(
      payload.managementDepartment,
    );
    const adminId = await generatedAdminId(department as TAcademicDepartment);

    // Set id
    userData.id = adminId;

    const isAdmin = await User.findOne({id: adminId});
    if(isAdmin){
      throw new AppError(httpStatus.CONFLICT, 'Wrong')
    }

    // Create admin user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create admin into DB (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    await session.endSession();
  }
};

const getMyInformationFromDB = async(userId: string, token: string) => {

  const decoded = jwt.verify(token, config.jwt_access_secret_token as string) as JwtPayload;
  
  const decodedUserId = decoded.userId;

  if(decodedUserId !== userId){
    throw new AppError(httpStatus.UNAUTHORIZED, `Tou are not authorized person to access ${userId} user information`)
  }

  const data = await Student.findOne({id: userId});

  return data;
}

export const UserServices = {
  createStudentUserIntoDB,
  createFacultyUserIntoDB,
  createAdminUserIntoDB,
  getMyInformationFromDB
};
