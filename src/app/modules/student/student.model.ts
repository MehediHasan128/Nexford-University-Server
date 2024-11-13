import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLoaclGuardian,
  TStudent,
  TStudentModel,
  TUSerName,
} from './student.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const userNameSchema = new Schema<TUSerName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<TLoaclGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
});

const createStudentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: [true, 'User id is required'], unique: true, ref: 'User' },
    name: userNameSchema,
    gender: { type: String, enum: ['male', 'female'], required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      required: false,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    addmistionSemester: { type: Schema.Types.ObjectId, required: [true, 'Addmission Smester is required'], ref: 'AcademicSemester' },
    academicDepartment: { type: Schema.Types.ObjectId, required: [true, 'Academic Department is required'], ref: 'department' },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  },
);


// Creating for static methods
createStudentSchema.statics.isUserExists = async function(id: string) {
  const existingUser = await Student.findOne({id});
  return existingUser;
}


// Creating for instance methods

// createStudentSchema.methods.isUserExists = async function(id: string){
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }


// Check a student is exist or not
createStudentSchema.pre('findOneAndUpdate', async function(next){
  const query = this.getQuery();
  
  const isExistsStudent = await Student.findOne({id: query.id});

  if(!isExistsStudent){
    throw new AppError(httpStatus.BAD_REQUEST, "This student dose not exists on data base!")
  };

  next();
})

export const Student = model<TStudent, TStudentModel>('student', createStudentSchema);
