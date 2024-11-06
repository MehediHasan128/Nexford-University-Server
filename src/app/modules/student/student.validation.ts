import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z.string().max(10, { message: 'First name must be less then 10 characters' }),
    middleName: z.string().max(10, { message: 'Middle name must be less then 10 characters' }).optional(),
    lastName: z.string().max(10, { message: 'Last name must be less then 10 characters' })
});


const guardianValidationSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),

    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional()
});


const localGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional()
});




const createStudentValidationSchema = z.object({
    id: z.string(),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female']),
    email: z.string().email({ message: 'Invalid email address' }),
    dateOfBirth: z.string().datetime({ message: 'Date must be UTC' }),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean().default(false)
});



// export const StudentValidation = {
//     createStudentValidationSchema
// }

export default createStudentValidationSchema