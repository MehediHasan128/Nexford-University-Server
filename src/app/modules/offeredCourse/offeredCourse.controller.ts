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

const updateOfferedCourse = catchAsync(async(req, res) => {
  const {offeredCourseId} = req.params;
  const data = await OfferedCourseServices.upadteOfferedCourseIntoDB(offeredCourseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully update offered course',
    data: data,
  });
})

export const offeredCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  updateOfferedCourse
};
