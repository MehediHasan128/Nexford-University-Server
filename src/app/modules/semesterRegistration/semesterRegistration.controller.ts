import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { SemesterRegistrationServices } from './semesterRegistration.services';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const data =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration created successfully',
    data: data,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const data =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get all semester registration',
    data: data,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { semesterRegistrationId } = req.params;
  const data =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
      semesterRegistrationId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get semester registration',
    data: data,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { semesterRegistrationId } = req.params;
  const data =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      semesterRegistrationId,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully get semester registration',
    data: data,
  });
});

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  updateSemesterRegistration,
  getSingleSemesterRegistration,
};
