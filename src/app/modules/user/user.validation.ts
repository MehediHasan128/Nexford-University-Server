import { z } from "zod";

const createUserValidationSchema = z.object({
    password: z.string({invalid_type_error: "Password must be string"}).min(8, "Password must be at least 8 characters long").max(20, "Password cant not more than 20 characters").optional(),
});

export const UserValidation = {
    createUserValidationSchema
}