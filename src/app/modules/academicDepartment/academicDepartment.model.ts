import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const createAcademicDepartmentSchema = new Schema<TAcademicDepartment>({
    departmentName: { type: String, required: true },
    academicFaculty: { type: Schema.Types.ObjectId, required: true }
});

createAcademicDepartmentSchema.pre('save', async function(next){
    const departmentExists = await AcademicDepartment.findOne({departmentName: this.departmentName});
    if(departmentExists){
        throw new Error("Department is already exists");
    };
    next();
})

export const AcademicDepartment = model<TAcademicDepartment>('department', createAcademicDepartmentSchema);