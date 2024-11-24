import { model, Schema } from 'mongoose';
import { TOfferedCourse } from './offeredCourse.interface';
import { days } from './offeredCourse.constant';

const createOfferedCourseSchema = new Schema<TOfferedCourse>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
    required: [true, 'Academic semester is required.'],
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicFaculties',
    required: [true, 'Academic faculty is required.'],
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'department',
    required: [true, 'Academic department is required.'],
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: [true, 'Course is required.'],
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'faculties',
    required: [true, 'Faculty is required.'],
  },
  section: {
    type: String,
    required: [true, 'Section is required.'],
    trim: true,
  },
  studentCapacity: {
    type: Number,
    required: [true, 'Student capacity is required.'],
    min: [20, 'Student capacity must be at least 20.'],
  },
  classSchedule: {
    type: String,
    enum: days,
    required: [true, 'Class schedule is required.'],
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required.']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required.']
  },
},{
  timestamps: true
});


export const OfferedCourse = model<TOfferedCourse>('OfferedCourse', createOfferedCourseSchema);