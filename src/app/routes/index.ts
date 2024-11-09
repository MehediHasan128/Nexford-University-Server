import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.router";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.router";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/academicSemester',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academicFaculty',
        route: AcademicFacultyRouter
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;