import {
  CivilStatus,
  Department,
  EmploymentType,
  Gender,
  Nationality,
  WorkRole
} from '@prisma/client';

export type Order = 'desc' | 'asc';

export type Field =
  | 'username'
  | 'password'
  | 'lastName'
  | 'firstName'
  | 'middleName'
  | 'contactEmail'
  | 'contactNumber'
  | 'profileGender'
  | 'profileBirthday'
  | 'profileCivilStatus'
  | 'profileNationality'
  | 'profileAddress'
  | 'educationLevel'
  | 'educationCourse'
  | 'educationYearStart'
  | 'educationYearGraduate'
  | 'educationSchool'
  | 'workRole'
  | 'workDepartment'
  | 'workTitle'
  | 'workCode'
  | 'workEmploymentType'
  | 'workHireDate';
