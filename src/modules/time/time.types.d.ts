import { Order } from '../../utilities/types';

export type OrderBy = {
  user?:
    | {
        lastName?: Order;
        firstName?: Order;
        middleName?: Order;
        workDepartment?: Order;
        workEmploymentType?: Order;
      }
    | undefined;
  date?: string | date | undefined;
};

export type Field =
  | 'lastName'
  | 'firstName'
  | 'middleName'
  | 'workDepartment'
  | 'workEmploymentType';

export type FieldWithDate =
  | 'lastName'
  | 'firstName'
  | 'middleName'
  | 'workDepartment'
  | 'workEmploymentType'
  | 'date';

export type TimeSchemaDataObj = {
  timeInAm?: Date;
  timeOutAm?: Date;
  timeInPm?: Date;
  timeOutPm?: Date;
  error?: string;
};
