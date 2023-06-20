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

export function userUuidIsValid(uuid: string) {
  const uuidRegExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
  return uuidRegExp.test(uuid);
}
