import httpStatus from 'http-status';
import AppError from "../../errors/AppError";
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

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
    
};


const getAllSemesterRegistrationFromDB = async(query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields();
    const data = await semesterRegistrationQuery.queryModel;
    return data;
}


const getSingleSemesterRegistrationFromDB = async(id: string) => {
    const data = await SemesterRegistration.findById(id).populate('academicSemester');
    return data;
}


export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB
}