export type TAcademicSemesterNameCodemapper = {
  [key: string]: string
}

export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TacademicSemesterName = 'Spring' | 'Summer' | 'Fall';
export type TacademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  semesterName: TacademicSemesterName;
  semesterCode: TacademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};