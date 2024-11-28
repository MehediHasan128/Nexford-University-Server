import express from 'express';
import { StudentController } from './student.controller';
import auth from '../../middlwares/auth';

const router = express.Router();

// Get all student
router.get('/', auth(), StudentController.getAllStudent);

// Get single student
router.get('/:studentId', StudentController.getSingleStudent);

// Update student
router.patch('/:studentId', StudentController.updateStudent);

export const StudentRoutes = router;