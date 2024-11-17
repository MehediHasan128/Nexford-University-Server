import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlwares/validationRequest';
import { StudentValidation } from '../student/student.validation';
import { AdminValidation } from '../admin/admin.validation';
import { FacultyValidation } from '../faculty/faculty.validation';

const router = express.Router();

router.post('/create-student', validateRequest(StudentValidation.createStudentValidationSchema), UserController.createStudentUser);
router.post('/create-faculty', validateRequest(FacultyValidation.createFacultyValidationSchema), UserController.createFacultyUser);
router.post('/create-admin', validateRequest(AdminValidation.createAdminValidationSchema), UserController.createAdminUSer);

export const UserRoutes = router;
