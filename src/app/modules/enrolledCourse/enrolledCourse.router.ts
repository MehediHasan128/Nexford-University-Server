import express from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { EnrooledCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';

const router = express.Router();

// Get all student
router.post('/create-enrolledCourse', validateRequest(EnrooledCourseValidation.createEnrolledCourseValidationSchema), EnrolledCourseController.CreateEnrolledCourse);

export const EnrolledCourseRoutes = router;