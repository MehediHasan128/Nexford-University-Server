import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const data = await AcademicFaculty.create(payload);
    return data;
};

const getAllAcademicFacultyFromDB = async() => {
    const data = await AcademicFaculty.find()
    return data;
};

const getSingleAcademicFacultyFromDB = async(id: string) => {
    const data = await AcademicFaculty.findById(id);
    return data;
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB
}