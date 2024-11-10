import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const createAcademicFacultySchema = new Schema<TAcademicFaculty>({
    facultyName: { type: String, required: true }
},{
    timestamps: true
});


export const AcademicFaculty = model<TAcademicFaculty>('academicFaculties', createAcademicFacultySchema);