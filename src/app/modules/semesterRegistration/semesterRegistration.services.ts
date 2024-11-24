import httpStatus from 'http-status';
import AppError from "../../errors/AppError";
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { registrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration) => {

    // Check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [
            { status: registrationStatus.UPCOMING },
            { status: registrationStatus.ONGOING }
        ]
    });

    if(isThereAnyUpcomingOrOngoingSemester){
        throw new AppError(httpStatus.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester`);
    }

    // check if the semester is exists
    const isAcademicSemesterExists = await AcademicSemester.findById(payload?.academicSemester);
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


const updateSemesterRegistrationIntoDB = async(id: string, payload: Partial<TSemesterRegistration>) => {

    // Check the requested semester is exists or not
    const isRequestedSemesterIsExists = await SemesterRegistration.findById(id);

    // Check the semester registration is ended or not
    const currentSemesterRegistrationStatus = isRequestedSemesterIsExists?.status;
    const requestedSemesterRegistrationStatus = payload?.status;
    
    if(currentSemesterRegistrationStatus === registrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterRegistrationStatus}`);
    }

    if(currentSemesterRegistrationStatus === registrationStatus.UPCOMING && requestedSemesterRegistrationStatus === registrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST, `You cant not directly change status from ${currentSemesterRegistrationStatus} to ${requestedSemesterRegistrationStatus}`);
    }

    if(currentSemesterRegistrationStatus === registrationStatus.ONGOING && requestedSemesterRegistrationStatus === registrationStatus.UPCOMING){
        throw new AppError(httpStatus.BAD_REQUEST, `You cant not change status from ${currentSemesterRegistrationStatus} to ${requestedSemesterRegistrationStatus}`);
    }

    const data = await SemesterRegistration.findByIdAndUpdate(id, payload, {new: true, runValidators: true});
    return data;
}


export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB,
    getSingleSemesterRegistrationFromDB,
}