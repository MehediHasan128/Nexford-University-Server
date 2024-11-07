import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponce';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudentUser = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentUserIntoDB(
    password,
    studentData,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserController = {
  createStudentUser,
};
