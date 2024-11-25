import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import httpStatus from 'http-status';
import { OfferedCourseServices } from './offeredCourse.services';

const createOfferedCourse = catchAsync(async (req, res) => {
  const data = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course created successfully',
    data: data,
  });
});


const getAllOfferedCourse = catchAsync(async (req, res) => {
    const data = await OfferedCourseServices.getAllOfferedCourseFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully get all offered course',
      data: data,
    });
  });

export const offeredCourseController = {
    createOfferedCourse,
    getAllOfferedCourse
};
