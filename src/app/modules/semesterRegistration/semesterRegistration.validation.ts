import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string()
      .nonempty({ message: 'Select Academic Semester' }),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.date({
      required_error: 'Provide registration starting date',
      invalid_type_error: 'Start date must be a valid date',
    }),
    endDate: z.date({
      required_error: 'Provide registration end date',
      invalid_type_error: 'End date must be a valid date',
    }),
    minCredits: z
      .number()
      .min(3, { message: 'Minimum credits should be at least 3' })
      .default(3),
    maxCredits: z
      .number()
      .max(16, { message: 'Maximum credits should not exceed 16' })
      .default(16),
  }),
});

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
};
