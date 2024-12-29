import express from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';
import auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// Get all student
router.post(
  '/create-enrolledCourse',
  auth(userRole.student),
  validateRequest(
    EnrolledCourseValidation.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseController.CreateEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(userRole.faculty),
  validateRequest(EnrolledCourseValidation.updateEnrolledCourseMarksValidationSchema),
  EnrolledCourseController.updateEnrolledCourseMarks
);

export const EnrolledCourseRoutes = router;
