import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlwares/validationRequest';
import { StudentValidation } from '../student/student.validation';
import { AdminValidation } from '../admin/admin.validation';
import { FacultyValidation } from '../faculty/faculty.validation';
import auth from '../../middlwares/auth';
import { userRole } from './user.constant';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
    auth(userRole.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
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
