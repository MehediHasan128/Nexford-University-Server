import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        departmentName: z.string(),
        academicFaculty: z.string()
    })
});


export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema
}