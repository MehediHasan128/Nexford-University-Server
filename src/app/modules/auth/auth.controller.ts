import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { AuthServices } from './auth.services';

const loginUserIntoDB = catchAsync(async (req, res) => {
  const data = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: data,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const data = await AuthServices.changeUserPassword(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password successfully update',
    data: data,
  });
});

export const AuthController = {
  loginUserIntoDB,
  changePassword
};
