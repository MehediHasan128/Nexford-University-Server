import { TCourse } from "./course.interface"
import { Course } from "./course.model"

const createCourseIntoDB = async(payload: TCourse) => {

    payload.courseCode = payload.prefix + payload.code;

    const data = await Course.create(payload);
    return data;
}


const getAllCourseFromDB = async() => {
    const data = await Course.find();
    return data;
};


const getSingleCorseFromDB = async(id: string) => {
    const data = await Course.findById(id);
    return data;
}


const updateSingleCourseIntoDB = async(id: string, payload: Partial<TCourse>) => {
    const data = await Course.findByIdAndUpdate(id, payload, {new: true});
    return data;
};


const deleteCourseFromDB = async(id: string) => {
    const data = await Course.findByIdAndUpdate(id, {isDeleted: true}, {new: true});
    return data;
}


export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCorseFromDB,
    updateSingleCourseIntoDB,
    deleteCourseFromDB
}