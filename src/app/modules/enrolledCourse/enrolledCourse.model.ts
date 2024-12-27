import { model, Schema } from 'mongoose';
import { TCourseMarks, TEnrolledCourse } from './enrolledCourse.interface';
import { grade } from './enrolledCourse.constant';

const CourseMarksSchema = new Schema<TCourseMarks>(
  {
    classTest1: { type: Number, min: 0, max: 10, default: 0 },
    midTerm: { type: Number, min: 0, max: 30, default: 0 },
    classTest2: { type: Number, min: 0, max: 10, default: 0 },
    finalTerm: { type: Number, min: 0, max: 50, default: 0 },
  },
  {
    _id: false,
  },
);

const EnrolledCourseSchema = new Schema<TEnrolledCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      ref: 'SemesterRegistration',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculties',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'department',
      required: true,
    },
    offeredCourse: {
      type: Schema.Types.ObjectId,
      ref: 'OfferedCourse',
      required: true,
    },
    course: { type: Schema.Types.ObjectId, ref: 'course', required: true },
    student: { type: Schema.Types.ObjectId, ref: 'student', required: true },
    faculty: { type: Schema.Types.ObjectId, ref: 'faculties', required: true },
    isEnrolled: { type: Boolean, default: false },
    courseMarks: { type: CourseMarksSchema, default: {} },
    grade: {
      type: String,
      enum: grade,
      default: 'NA',
    },
    gradePoints: { type: Number, min: 0, max: 4, default: 0 },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const EnrolledCourse = model<TEnrolledCourse>(
  'EnrolledCourse',
  EnrolledCourseSchema,
);
