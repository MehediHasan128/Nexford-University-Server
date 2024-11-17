import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(10, { message: 'First name must be less then 10 characters' }),
  middleName: z
    .string()
    .max(10, { message: 'Middle name must be less then 10 characters' })
    .optional(),
  lastName: z
    .string()
    .max(10, { message: 'Last name must be less then 10 characters' }),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string({ invalid_type_error: 'Password must be string' })
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password cant not more than 20 characters')
      .optional(),
    faculty: z.object({
      name: userNameValidationSchema,
      designation: z.string(),
      gender: z.enum(['male', 'female']),
      email: z.string().email({ message: 'Invalid email address' }),
      dateOfBirth: z.string().datetime({ message: 'Date must be UTC' }),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const FacultyValidation = { createFacultyValidationSchema };
