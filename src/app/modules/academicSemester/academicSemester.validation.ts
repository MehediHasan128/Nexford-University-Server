import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterName,
  Months,
} from './academicSemester.constant';

const createAcademiSemesterValdationSchema = z.object({
  body: z.object({
    semesterName: z.enum([...academicSemesterName] as [string, ...string[]]),
    semesterCode: z.enum([...academicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidation = {
  createAcademiSemesterValdationSchema,
};
