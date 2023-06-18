/**
 * In-controller Validation
 */

enum Field {
  date,
  lastName,
  firstName,
  middleName,
  workDepartment,
  workEmploymentType
}

export function timeFieldIsValid(fieldInput: string) {
  return Object.values(Field).includes(fieldInput as unknown as Field);
}