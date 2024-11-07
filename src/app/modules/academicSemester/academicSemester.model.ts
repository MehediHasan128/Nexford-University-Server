import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
} from './academicSemester.interface';
import { academicSemesterCode, academicSemesterName, Months } from './academicSemester.constant';

const createAcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    semesterName: { type: String, enum: academicSemesterName, required: true },
    semesterCode: { type: String, enum: academicSemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months },
    endMonth: { type: String, enum: Months },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  createAcademicSemesterSchema,
);
