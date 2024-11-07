import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponce';
import httpStatus from 'http-status';

const createStudentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudentUser,
};
