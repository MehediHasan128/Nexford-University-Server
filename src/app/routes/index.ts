import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.router';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.router';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.router';
import { StudentRoutes } from '../modules/student/student.router';
import { AdminRoutes } from '../modules/admin/admin.router';
import { CourseRoutes } from '../modules/course/course.router';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.router';
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.router';
import { AuthRoutes } from '../modules/auth/auth.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/academicSemester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academicFaculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academicDepartment',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semesterRegistration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offeredCourse',
    route: offeredCourseRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
