import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';
import validateRequest from '../../middlwares/validationRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';

const router = express.Router();

// Create offered course
router.post('/create-offered-course', validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema), offeredCourseController.createOfferedCourse);
router.get('/', offeredCourseController.getAllOfferedCourse);

export const offeredCourseRoutes = router;