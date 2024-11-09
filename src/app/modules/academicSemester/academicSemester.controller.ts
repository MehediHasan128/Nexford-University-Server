import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(async (req, res) => {
  const semesterData = req.body;

  const data =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(semesterData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: data,
  });
});


const getAllAcademicSemester = catchAsync(async (req, res) => {
  const data = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all academic semester successfully',
    data: data,
  });
});


const getSingleSemester = catchAsync(async (req, res) => {
  const {id} = req.params;

  const data = await AcademicSemesterServices.getSingleSemesterById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get academic semester successfully',
    data: data,
  });
})

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleSemester
};
