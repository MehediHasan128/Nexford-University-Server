import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string()
      .nonempty({ message: 'Select Academic Semester' }),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string({
      required_error: 'Provide registration starting date',
      invalid_type_error: 'Start date must be a valid date',
    }),
    endDate: z.string({
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

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string()
      .nonempty({ message: 'Select Academic Semester' }).optional(),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]).optional(),
    startDate: z.string({
      required_error: 'Provide registration starting date',
      invalid_type_error: 'Start date must be a valid date',
    }).optional(),
    endDate: z.string({
      required_error: 'Provide registration end date',
      invalid_type_error: 'End date must be a valid date',
    }).optional(),
    minCredits: z
      .number()
      .min(3, { message: 'Minimum credits should be at least 3' })
      .default(3).optional(),
    maxCredits: z
      .number()
      .max(16, { message: 'Maximum credits should not exceed 16' })
      .default(16).optional(),
  }),
});

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema
};
