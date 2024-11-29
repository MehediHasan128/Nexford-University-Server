import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponce";
import { StudentServices } from "./student.services";

const getAllStudent = catchAsync(async(req, res) => {

    const data = await StudentServices.getAllStudentFromDB(req.query);
    console.log('This is cookie', req.cookies);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get all student successfully',
        data: data,
      });
});


const getSingleStudent = catchAsync(async(req, res) => {
  const {studentId} = req.params;
  const data = await StudentServices.getSingleStudentFromBD(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get student successfully',
    data: data,
  });
});


const updateStudent = catchAsync(async(req, res) => {
  const {studentId} = req.params;
  const {student} = req.body;

  const data = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: data,
  });
})

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent
};
