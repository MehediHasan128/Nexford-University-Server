import { Types } from "mongoose";

export type TAcademicDepartment = {
    departmentName: string;
    academicFaculty: Types.ObjectId;
}