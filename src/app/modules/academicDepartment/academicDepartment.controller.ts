import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponce";
import { AcademicDepartmentServices } from "./academicDepartment.services";
import httpStatus from 'http-status';

const createAcademicDepartment = catchAsync(async(req, res) => {
    const academicDepartmentData = req.body;
    const data = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(academicDepartmentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create academic department successfully',
        data: data,
      });
});


const getAllAcademicDepartment = catchAsync(async(req, res) => {
    const data = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get all academic department successfully',
        data: data,
      });
})


export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment
}