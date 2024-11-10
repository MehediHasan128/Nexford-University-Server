import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponce";
import { AcademicFacultyServices } from "./academicFaculty.services";

const createAcademicFaculty = catchAsync(async (req, res) => {
    const facultyData = req.body;

    const data = await AcademicFacultyServices.createAcademicFacultyIntoDB(facultyData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create academic faculty successfully',
        data: data,
      });
});


const getAllAcademicFaculty = catchAsync(async(req, res) => {
    const data = await AcademicFacultyServices.getAllAcademicFacultyFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get all academic faculty successfully',
        data: data,
      });
});


const getSingleAcademicFaculty = catchAsync(async(req, res) => {
    const {academicFacultyId} = req.params;
    const data = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(academicFacultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Find academic faculty successfully',
        data: data,
      });
})


export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty
}