import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationSchema = new Schema<TSemesterRegistration>({
    academicSemester: { type: Schema.Types.ObjectId, required: [true, 'Select Academic Semester'], ref: 'AcademicSemester', unique: true },
    status: { type: String, enum: SemesterRegistrationStatus, default: 'UPCOMING' },
    startDate: { type: String, required: [true, 'Provide registration starting date'] },
    endDate: { type: String, required: [true, 'Provide registration end date'] },
    minCredits: { type: Number, default: 3 },
    maxCredits: { type: Number, default: 16 }
}, {
    timestamps: true
});


export const SemesterRegistration = model<TSemesterRegistration>('SemesterRegistration', createSemesterRegistrationSchema)