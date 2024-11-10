import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';

const createAcademicDepartmentSchema = new Schema<TAcademicDepartment>({
    departmentName: { type: String, required: true },
    departmentCode: { type: String, required: true },
    academicFaculty: { type: Schema.Types.ObjectId, required: true, ref: 'academicFaculties' }
});

createAcademicDepartmentSchema.pre('save', async function(next){
    const departmentExists = await AcademicDepartment.findOne({departmentName: this.departmentName});
    if(departmentExists){
        throw new AppError(httpStatus.BAD_REQUEST, "Department is already exists");
    };
    next();
})

export const AcademicDepartment = model<TAcademicDepartment>('department', createAcademicDepartmentSchema);