import { AcademicDepartment } from "./academicDepartment.model";
import { TAcademicDepartment } from "./academicDepartment.interface";

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