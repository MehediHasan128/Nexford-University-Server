import { Student } from "./student.model"

const getAllStudentFromDB = async() => {
    const data = await Student.find().populate({path: 'academicDepartment', populate: {path: 'academicFaculty'}}).populate('addmistionSemester');
    return data;
}

const getSingleStudentFromBD = async(studentId: string) => {
    const data = await Student.findOne({id: studentId}).populate({path: 'academicDepartment', populate: {path: 'academicFaculty'}}).populate('addmistionSemester');
    return data;
}

export const StudentServices = {
    getAllStudentFromDB,
    getSingleStudentFromBD
}