import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async(payload: TAcademicDepartment) => {
    const data = await AcademicDepartment.create(payload);
    return data;
};

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB
}