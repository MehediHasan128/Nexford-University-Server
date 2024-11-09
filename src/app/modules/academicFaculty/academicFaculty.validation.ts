import { z } from "zod";

const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        facultyName: z.string()
    })
});


export const AcademicFacultyValidation = {
    createAcademicFacultyValidationSchema
}