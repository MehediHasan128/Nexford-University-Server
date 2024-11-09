import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponce";
import { StudentServices } from "./student.services";

const getAllStudent = catchAsync(async(req, res) => {
    const data = await StudentServices.getAllStudentFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get all student successfully',
        data: data,
      });
})

export const StudentController = {
  getAllStudent
};
