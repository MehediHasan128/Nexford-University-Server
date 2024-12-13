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

const refreshToken = catchAsync(async (req, res) => {
  const {refreshToken} = req.cookies
  const data = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Access token is retrieved successfully',
    data: data
  });
});

const forgetUserPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const data = await AuthServices.forgetPassword(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your password reset link genereted successfully',
    data: data
  });
});

const resetUserPassword = catchAsync(async (req, res) => {
  const resetPassData = req.body;
  const resetToken = req.headers.authorization;
  const data = await AuthServices.resetPassword(resetPassData, resetToken as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Your password reset successfully',
    data: data
  });
});

export const AuthController = {
  loginUserIntoDB,
  changePassword,
  refreshToken,
  forgetUserPassword,
  resetUserPassword
};
