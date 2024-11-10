import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlwares/validationRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// Create Academic Faculty
router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

// Get all academic faculty
router.get('/', AcademicFacultyController.getAllAcademicFaculty);

// Get single academic faculty
router.get('/:academicFacultyId', AcademicFacultyController.getSingleAcademicFaculty);

export const AcademicFacultyRoutes = router;
