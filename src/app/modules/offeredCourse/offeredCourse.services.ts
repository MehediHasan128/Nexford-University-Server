import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model"
import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferedCourse } from "./offeredCourse.model"
import httpStatus from 'http-status';

const createOfferedCourseIntoDB = async(payload: TOfferedCourse) => {

    const {semesterRegistration, academicFaculty, academicDepartment, course, faculty} = payload;

    const isRegisteredSemesterExists = await SemesterRegistration.findById(semesterRegistration);
    if(!isRegisteredSemesterExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Registered semester not found');
    };

    const isacademicFacultyExists = await AcademicFaculty.findById(academicFaculty);
    if(!isacademicFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
    };

    const isacademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);
    if(!isacademicDepartmentExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
    };

    const isCourseExists = await Course.findById(course);
    if(!isCourseExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    };

    const isFacultyExists = await Faculty.findById(faculty);
    if(!isFacultyExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
    };

    payload.academicSemester = isRegisteredSemesterExists.academicSemester;

    const data = await OfferedCourse.create(payload);
    return data;
}


const getAllOfferedCourseFromDB = async() => {
    const data = await OfferedCourse.find().populate('academicSemester').populate('academicFaculty').populate('academicDepartment').populate('course').populate('faculty');
    return data;
}



export const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB
}