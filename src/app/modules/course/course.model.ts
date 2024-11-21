import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculties,
  TPreRequisiteCourse,
} from './course.interface';

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: { type: Schema.Types.ObjectId, ref: 'course' },
  isDeleted: { type: Boolean, default: false },
});

const createCourseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: Number,
      required: true,
      trim: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      min: 0,
    },
    preRequisiteCourse: [preRequisiteCourseSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const createCourseFacultiesSchema = new Schema<TCourseFaculties>({
  course: { type: Schema.Types.ObjectId, ref: 'course', unique: true },
  faculties: [{ type: Schema.Types.ObjectId, ref: 'faculties' }],
});

export const Course = model<TCourse>('course', createCourseSchema);
export const CourseFaculties = model<TCourseFaculties>(
  'CourseFaculty',
  createCourseFacultiesSchema,
);
