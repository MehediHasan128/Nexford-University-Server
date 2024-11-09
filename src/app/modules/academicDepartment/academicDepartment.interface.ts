import { Types } from "mongoose";

export type TAcademicDepartment = {
    departmentName: string;
    departmentCode: string;
    academicFaculty: Types.ObjectId;
}