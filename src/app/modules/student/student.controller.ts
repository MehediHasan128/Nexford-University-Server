/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StudentServices } from './student.services';
import createStudentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const {student: studentData} = req.body;

    const zodParseData = createStudentValidationSchema.parse(studentData)

    const result = await StudentServices.createStudentIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err
    })
  }
};

export const StudentController = {
  createStudent,
};
