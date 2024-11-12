import { User } from './user.model';
import { Student } from '../student/student.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TAcademicDepartment } from '../academicDepartment/academicDepartment.interface';

const findLastUser = async (UserRole: string) => {
  const lastUser = await User.findOne(
    {
      role: UserRole,
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.id ? lastUser.id : undefined;
};

const findLastAcademicDepartment = async () => {
  const lastAcademicDepartment = await Student.findOne(
    { isDeleted: false },
    { academicDepartment: 1, _id: 0 },
  ).sort({ createdAt: -1 });
  return lastAcademicDepartment;
};

export const generatedStudentId = async (
  payload: TAcademicSemester,
  academicDepartment: TAcademicDepartment,
  currentDepartmentId: string,
) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastUser('student');
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentYear = payload.year;
  const currentSemesterCode = payload.semesterCode;

  const lastDepartment = await findLastAcademicDepartment();
  const lastDepartmentID = lastDepartment?.academicDepartment?.toString();

  if (
    lastStudentId &&
    lastStudentYear === currentYear &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastDepartmentID === currentDepartmentId
  ) {
    currentId = lastStudentId?.substring(9);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.semesterCode}${academicDepartment.departmentCode}${incrementId}`;

  return incrementId;
};

export const generatedFacultyId = async (payload: TAcademicDepartment) => {
  const currentYear = new Date().getFullYear();
  let cuurentId = (0).toString();

  const lastFacultyId = await findLastUser('faculty');
  const lastDepartmentCode = lastFacultyId?.substring(7, 9);
  if (lastFacultyId && lastDepartmentCode === payload.departmentCode) {
    cuurentId = lastFacultyId?.substring(9);
  }

  let incrementId = (Number(cuurentId) + 1).toString().padStart(3, '0');

  incrementId = `Fa-${currentYear}${payload.departmentCode}${incrementId}`;
  return incrementId;
};
