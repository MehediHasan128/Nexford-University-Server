/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { Student } from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import httpStatus from 'http-status';
import { EnrolledCourse } from './enrolledCourse.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;

  // Check if the offered course is exists
  const isExistsOfferedCourse = await OfferedCourse.findById(offeredCourse);
  if (!isExistsOfferedCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course is not found!');
  }

  if (isExistsOfferedCourse.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full!');
  }

  // Check if a student is already enrolled a course
  const student = await Student.findOne({ id: userId }).select('_id');
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isExistsOfferedCourse?.semesterRegistration,
    offeredCourse,
    student: student?._id,
  });
  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student already enrolled in this course!',
    );
  }

  //   Check total credits exceeds maxCredits
  const semesterRegistration = await SemesterRegistration.findById(
    isExistsOfferedCourse.semesterRegistration,
    { maxCredits: 1, _id: 0 },
  );
  console.log(semesterRegistration);

  // total enrolled credit + new enrolled credit > maxCredit
  const enrolledCourses = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isExistsOfferedCourse?.semesterRegistration,
        student: student?._id,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourseData',
      },
    },
    {
      $unwind: '$enrolledCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolledCredits: 1,
      },
    },
  ]);

  const totalCredits =
    enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

  const newCourse = await Course.findById(isExistsOfferedCourse.course, {
    _id: 0,
    credits: 1,
  });

  const totalEnrolledCredits = totalCredits + newCourse?.credits;

  if (totalCredits && totalEnrolledCredits > semesterRegistration!.maxCredits) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have exceeded maximum number of credits!',
    );
  }

  payload.semesterRegistration = isExistsOfferedCourse?.semesterRegistration;
  payload.academicSemester = isExistsOfferedCourse?.academicSemester;
  payload.academicFaculty = isExistsOfferedCourse?.academicFaculty;
  payload.academicDepartment = isExistsOfferedCourse?.academicDepartment;
  payload.offeredCourse = isExistsOfferedCourse?._id;
  payload.course = isExistsOfferedCourse?.course;
  payload.student = student._id;
  payload.faculty = isExistsOfferedCourse?.faculty;
  payload.isEnrolled = true;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create([payload], { session });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this course',
      );
    }

    const maxCapacity = isExistsOfferedCourse.maxCapacity;
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    );
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  const isStudentExists = await Student.findById(student);

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty?._id
  });

  if(!isCourseBelongToFaculty){
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks
  }

  if(courseMarks && Object.keys(courseMarks).length){
    for(const [key, value] of Object.entries(courseMarks)){
      modifiedData[`courseMarks.${key}`] = value;
    }
  }

  const data = await EnrolledCourse.findByIdAndUpdate(isCourseBelongToFaculty._id, modifiedData, {new: true});

  return data;
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};