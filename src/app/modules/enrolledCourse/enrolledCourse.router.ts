import express from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { EnrooledCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';
import auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// Get all student
router.post(
  '/create-enrolledCourse',
  auth(userRole.student),
  validateRequest(
    EnrooledCourseValidation.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseController.CreateEnrolledCourse,
);

export const EnrolledCourseRoutes = router;
