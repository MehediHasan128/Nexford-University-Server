/* eslint-disable @typescript-eslint/no-unused-vars */
import { startSession } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculties } from './course.interface';
import { Course, CourseFaculties } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  payload.courseCode = payload.prefix + payload.code;

  const data = await Course.create(payload);
  return data;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await courseQuery.queryModel;
  return data;
};

const getSingleCorseFromDB = async (id: string) => {
  const data = await Course.findById(id).populate('preRequisiteCourse.course');
  return data;
};

const updateSingleCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload;

  const session = await startSession();

  try {
    session.startTransaction();

    // step1: Basic course info update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    // check if there are any pre requisite course to update
    if (preRequisiteCourse && preRequisiteCourse.length) {
      // filter out the deleted field
      const deletedPreRequisites = preRequisiteCourse
        .filter((ele) => ele.course && ele.isDeleted)
        .map((ele) => ele.course);

      const deletePreRequisitesCorse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletePreRequisitesCorse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete pre requisites course',
        );
      }

      // filter out the new course field
      const newPreRequisites = preRequisiteCourse?.filter(
        (ele) => ele.course && !ele.isDeleted,
      );
      const newPreRequisitesCorse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );

      if (!newPreRequisitesCorse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to add pre requisites course',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const data = await Course.findById(id).populate(
      'preRequisiteCourse.course',
    );

    return data;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const data = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return data;
};

const assignFacultiesWithCourseIntoDB = async(id: string, payload: TCourseFaculties) => {
  const data = await CourseFaculties.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } }
    },
    {
      upsert: true,
      new: true
    }
  );

  return data;
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCorseFromDB,
  updateSingleCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB
};
