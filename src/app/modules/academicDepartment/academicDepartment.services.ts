import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async(payload: TAcademicDepartment) => {
    const data = await AcademicDepartment.create(payload);
    return data;
};

const getAllAcademicDepartmentFromDB = async() => {
    const data = await AcademicDepartment.find().populate('academicFaculty');
    return data;
}

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB
}