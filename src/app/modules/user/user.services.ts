import { startSession } from 'mongoose';
import config from '../../config';
import { TAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentUserIntoDB = async (password: string, payload: TStudent) => {
  // Create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_pass as string);

  // Set student role
  userData.role = 'student';

  // Start a session
  const session = await startSession();

  try {
    // start session
    session.startTransaction();

    // auto denerated student id
    const addmissionSemester = await AcademicSemester.findById(payload.addmistionSemester);
    const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment);
    const departmentIdString = payload.academicDepartment.toString();
    userData.id = await generatedStudentId(
      addmissionSemester as TAcademicSemester,
      academicDepartment as TAcademicDepartment,
      departmentIdString,
    );

    // Create user into DB
    const newUser = await User.create([userData], {session});

    // Create a student (transaction-1)
    if (!newUser.length) {
        throw new Error('Faild to create user');
    }
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;

      // Create student into DB (transaction-2)
      const newStudent = await Student.create([payload], {session});

      if(!newStudent){
        throw new Error('Faild to create student');
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

export const UserServices = {
  createStudentUserIntoDB,
};
