import { z } from "zod";


const createPreRequisiteCourseSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().default(false).optional()
})


const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourse: z.array(createPreRequisiteCourseSchema).optional()
    })
});


export const CourseValidations = {
    createCourseValidationSchema
}