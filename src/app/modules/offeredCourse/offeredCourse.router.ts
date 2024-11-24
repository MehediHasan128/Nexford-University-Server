import express from 'express';
import { offeredCourseController } from './offeredCourse.controller';

const router = express.Router();

// Create offered course
router.post('/create-offered-course', offeredCourseController.createOfferedCourse);

export const offeredCourseRoutes = router;