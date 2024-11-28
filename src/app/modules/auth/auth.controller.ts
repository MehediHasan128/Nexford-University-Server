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

export const AuthController = {
  loginUserIntoDB,
};
