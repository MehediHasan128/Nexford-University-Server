import httpStatus from 'http-status';
import AppError from "../../errors/AppError";
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"
import { AcademicSemester } from '../academicSemester/academicSemester.model';

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration) => {

    // check if the semester is exists
    const isAcademicSemesterExists = await AcademicSemester.findById(payload.academicSemester);
    if(!isAcademicSemesterExists){
        throw new AppError(httpStatus.NOT_FOUND, 'This academic semester not found');
    }

    // Check the semesterRegistration is existing or not
    const isSemesterRegistration = await SemesterRegistration.findOne({academicSemester: payload.academicSemester});
    if(isSemesterRegistration){
        throw new AppError(httpStatus.CONFLICT, 'Semester is already registered');
    }

    // create semester registration
    const data = await SemesterRegistration.create(payload);
    return data;
    
}


export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB
}