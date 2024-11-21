import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

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

  // step1: Basic course info update
  await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    { new: true, runValidators: true },
  );

  // check if there are any pre requisite course to update
  if (preRequisiteCourse && preRequisiteCourse.length) {
    // filter out the deleted field
    const deletedPreRequisites = preRequisiteCourse
      .filter((ele) => ele.course && ele.isDeleted)
      .map((ele) => ele.course);

    await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourse: { course: { $in: deletedPreRequisites } } },
    });

    // filter out the new course field
    const newPreRequisites = preRequisiteCourse?.filter(
      (ele) => ele.course && !ele.isDeleted,
    );
    await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
    });
  }


  const data = await Course.findById(id).populate('preRequisiteCourse.course');

  return data;
};

const deleteCourseFromDB = async (id: string) => {
  const data = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return data;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCorseFromDB,
  updateSingleCourseIntoDB,
  deleteCourseFromDB,
};
