import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlwares/validationRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();

// Create course
router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/', CourseController.getAllCourse);
router.get('/:id', CourseController.getSingleCourse);
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateSingleCourse,
);
router.put('/:courseId/assign-faculties', CourseController.assignFacultiesWithCourse);
router.delete('/:courseId/remove-faculties', CourseController.removeFacultiesWithCourse);
router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
