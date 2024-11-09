import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const createAcademicDepartmentSchema = new Schema<TAcademicDepartment>({
    departmentName: { type: String, required: true },
    academicFaculty: { type: Schema.Types.ObjectId, required: true }
});


export const AcademicDepartment = model<TAcademicDepartment>('department', createAcademicDepartmentSchema);