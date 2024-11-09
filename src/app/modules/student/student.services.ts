import { Student } from "./student.model"

const getAllStudentFromDB = async() => {
    const data = await Student.find().populate({path: 'academicDepartment', populate: {path: 'academicFaculty'}}).populate('addmistionSemester');
    return data;
}

export const StudentServices = {
    getAllStudentFromDB
}