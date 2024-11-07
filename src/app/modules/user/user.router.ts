import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlwares/validationRequest';
import { StudentValidation } from '../student/student.validation';

const router = express.Router();

router.post('/create-student', validateRequest(StudentValidation.createStudentValidationSchema), UserController.createStudentUser);

export const UserRoutes = router;
