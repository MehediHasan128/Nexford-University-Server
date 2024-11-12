import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// Get all student
router.get('/', StudentController.getAllStudent);

// Get single student
router.get('/:studentId', StudentController.getSingleStudent);

export const StudentRoutes = router;