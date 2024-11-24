import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import httpStatus from 'http-status';
import { OfferedCourseServices } from './offeredCourse.services';

const createOfferedCourse = catchAsync(async (req, res) => {
  const data = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: data,
  });
});

export const offeredCourseController = {
    createOfferedCourse
};
