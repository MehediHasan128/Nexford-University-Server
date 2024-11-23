import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponce";
import { SemesterRegistrationServices } from './semesterRegistration.services';

const createSemesterRegistration = catchAsync(async(req, res) => {

    const data = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester registration created successfully',
        data: data,
      });
})


export const SemesterRegistrationController = {
    createSemesterRegistration
}