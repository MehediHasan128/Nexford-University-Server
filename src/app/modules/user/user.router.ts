import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlwares/validationRequest';
import { StudentValidation } from '../student/student.validation';
import { AdminValidation } from '../admin/admin.validation';
import { FacultyValidation } from '../faculty/faculty.validation';
import auth from '../../middlwares/auth';
import { userRole } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  //   auth(userRole.admin),
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudentUser,
);
router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserController.createFacultyUser,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserController.createAdminUSer,
);
router.get(
  '/get-my-information/:userId',
  auth(userRole.student, userRole.faculty, userRole.admin),
  UserController.getMyInformation,
);

export const UserRoutes = router;
