// import httpStatus from 'http-status';
import { model, Schema } from "mongoose";
// import AppError from "../../errors/AppError";
import { TAcademicDepartment } from "./academicDepartment.interface";

const createAcademicDepartmentSchema = new Schema<TAcademicDepartment>({
    departmentName: { type: String, required: true, unique: true },
    departmentCode: { type: String, required: true },
    academicFaculty: { type: Schema.Types.ObjectId, required: true, ref: 'academicFaculties' }
});

// createAcademicDepartmentSchema.pre('save', async function(next){
//     const departmentExists = await AcademicDepartment.findOne({departmentName: this.departmentName});
//     if(departmentExists){
//         throw new AppError(httpStatus.NOT_FOUND, "Department is already exists");
//     };
//     next();
// })

export const AcademicDepartment = model<TAcademicDepartment>('department', createAcademicDepartmentSchema);