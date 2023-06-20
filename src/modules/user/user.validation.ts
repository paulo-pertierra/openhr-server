/**
 * In-controller Validation
 */

import { NextFunction, Request, Response, response } from 'express';

enum Field {
  userName,
  lastName,
  middleName,
  workRole,
  profileGender,
  profileBirthday,
  profileCivilStatus,
  profileNationality,
  profileAddress,
  workDepartment,
  workTitle,
  workCode,
  workEmploymentType,
  workHireDate,
  createdAt,
  updatedAt
}

export function userFieldIsValid(fieldInput: string) {
  return Object.values(Field).includes(fieldInput as unknown as Field);
}

export function userUuidIsValid(uuid: string) {
  const uuidRegExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
  return uuidRegExp.test(uuid);
}

/**
 * In-route Validation
 */

import { clientErrResponseHandler } from '../../utilities/responseHandler';
import { check, validationResult } from 'express-validator';
export const validateCreateUserData = [
  check('username').notEmpty().withMessage('Username is required.'),
  check('password').notEmpty().withMessage('Password is required.'),
  check('lastName').notEmpty().withMessage('Last name is required.'),
  check('firstName').notEmpty().withMessage('First name is required.'),
  check('middleName').optional(),
  check('contactEmail')
    .notEmpty()
    .withMessage('Contact email is required.')
    .isEmail()
    .withMessage('Contact email must be a valid email address.'),
  check('contactNumber').notEmpty(),
  check('profileGender').optional(),
  check('profileBirthday')
    .optional()
    .isISO8601()
    .withMessage('Profile birthday must be a valid date.'),
  check('profileCivilStatus').optional(),
  check('profileNationality').optional(),
  check('profileAddress').optional(),
  check('educationLevel').optional(),
  check('educationCourse').optional(),
  check('educationYearStart')
    .optional()
    .isInt({ min: 1900 })
    .withMessage('Education year start must be a valid year.'),
  check('educationYearGraduate')
    .optional()
    .isInt({ min: 1900 })
    .withMessage('Education year graduate must be a valid year.'),
  check('educationSchool').optional(),
  check('workRole').notEmpty().withMessage('Work role is required.'),
  check('workDepartment').optional(),
  check('workTitle').notEmpty().withMessage('Work Title is required.'),
  check('workCode').optional(),
  check('workEmploymentType').notEmpty().withMessage('Work employment is required.'),
  check('workHireDate').notEmpty().isISO8601().withMessage('Work hire date must be a valid date.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      clientErrResponseHandler(res, errors, 422);
      return;
    }
    next();
    return;
  }
];

export const validateEditUserData = [
  check('username').optional(),
  check('password').optional(),
  check('lastName').optional(),
  check('firstName').optional(),
  check('middleName').optional(),
  check('contactEmail')
    .optional()
    .isEmail()
    .withMessage('Contact email must be a valid email address.'),
  check('contactNumber').optional(),
  check('profileGender').optional(),
  check('profileBirthday')
    .optional()
    .isISO8601()
    .withMessage('Profile birthday must be a valid date.'),
  check('profileCivilStatus').optional(),
  check('profileNationality').optional(),
  check('profileAddress').optional(),
  check('educationLevel').optional(),
  check('educationCourse').optional(),
  check('educationYearStart')
    .optional()
    .isInt({ min: 1900 })
    .withMessage('Education year start must be a valid year.'),
  check('educationYearGraduate')
    .optional()
    .isInt({ min: 1900 })
    .withMessage('Education year graduate must be a valid year.'),
  check('educationSchool').optional(),
  check('workRole').optional(),
  check('workDepartment').optional(),
  check('workTitle').optional(),
  check('workCode').optional(),
  check('workEmploymentType'),
  check('workHireDate').optional().isISO8601(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      clientErrResponseHandler(res, errors, 422);
      return;
    }
    next();
    return;
  }
];