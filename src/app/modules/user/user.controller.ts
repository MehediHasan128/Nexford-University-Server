import httpStatus from 'http-status';
import { UserServices } from './user.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';

const createStudentUser = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentUserIntoDB(
    password,
    studentData,
    req.file
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created successfully',
    data: result,
  });
});

const createFacultyUser = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFacultyUserIntoDB(
    password,
    facultyData,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdminUSer = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminUserIntoDB(password, adminData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin is created successfully',
    data: result,
  });
});

const getMyInformation = catchAsync(async (req, res) => {
  const {userId} = req.params;
  const result = await UserServices.getMyInformationFromDB(userId, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully get your information',
    data: result,
  });
});

export const UserController = {
  createStudentUser,
  createFacultyUser,
  createAdminUSer,
  getMyInformation
};
