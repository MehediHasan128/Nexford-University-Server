import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { EnrolledCourseServices } from './enrolledCourse.services';
import sendResponse from '../../utils/sendResponce';

const CreateEnrolledCourse = catchAsync(async(req, res) => {

    const data = await EnrolledCourseServices.createEnrolledCourseIntoDB(req.user?.userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is enrolled successfully',
        data: data,
      });
});


export const EnrolledCourseController = {
    CreateEnrolledCourse,
}