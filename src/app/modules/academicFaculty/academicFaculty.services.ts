import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const data = await AcademicFaculty.create(payload);
    return data;
};

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB
}