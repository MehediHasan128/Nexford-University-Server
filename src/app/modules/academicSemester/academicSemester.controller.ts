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

export const AcademicSemesterController = {
  createAcademicSemester,
};
