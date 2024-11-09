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


export const AcademicFacultyController = {
    createAcademicFaculty
}