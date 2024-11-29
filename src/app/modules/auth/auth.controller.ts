import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { AuthServices } from './auth.services';
import config from '../../config';

const loginUserIntoDB = catchAsync(async (req, res) => {
  const data = await AuthServices.loginUser(req.body);
  const {refreshToken, accessToken, needsPasswordChange} = data;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true
  })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: {
      accessToken,
      needsPasswordChange
    },
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
