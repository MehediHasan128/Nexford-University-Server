import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model"
import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferedCourse } from "./offeredCourse.model"
import httpStatus from 'http-status';
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async(payload: TOfferedCourse) => {

    const {semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, classSchedule, startTime, endTime} = payload;

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

    // check if department is belong to faculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        academicFaculty,
        _id: academicDepartment
    });

    if(!isDepartmentBelongToFaculty){
        throw new AppError(httpStatus.NOT_FOUND, `${isacademicDepartmentExists.departmentName} is not belong to ${isacademicFacultyExists.facultyName}`)
    };

    // check if the samne course same section in same registered semester exists
    const isSameCourseExistsWithSameSemesterWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,
        course, 
        section
    });

    if(isSameCourseExistsWithSameSemesterWithSameSection){
        throw new AppError(httpStatus.BAD_REQUEST, `This course is already assign in section ${section}`)
    }


    // get the schedules of the faculties
    const assignedSchedules = await OfferedCourse.find({
        course,
        faculty,
        classSchedule: {$in: classSchedule}
    }).select('classSchedule startTime endTime');
    
    const newSchedule = {
        classSchedule,
        startTime,
        endTime
    };

    if(hasTimeConflict(assignedSchedules, newSchedule)){
        throw new AppError(httpStatus.CONFLICT, `This faculty is not avaiable at that time! Chose another time or day`)
    }


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