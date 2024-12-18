import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import { TAcademicSemester } from './academicSemester.interface';
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




createAcademicSemesterSchema.pre('save', async function(next){
  const existingSemester = await AcademicSemester.findOne({
    year: this.year,
    semesterName: this.semesterName
  });

  if(existingSemester){
    throw new AppError(httpStatus.CONFLICT, 'Semester is already exists')
  };
  next();
});


createAcademicSemesterSchema.pre('findOneAndUpdate', async function(next) {
  const query = this.getQuery();
  const isExistsAcademicSemester = await AcademicSemester.findById(query._id);
  
  if(!isExistsAcademicSemester){
    throw new AppError(httpStatus.NOT_FOUND, "This is academic semester dose not exists!")
  };
  next();
})


export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  createAcademicSemesterSchema,
);
