import { Order } from '../../utilities/types';

type OrderBy = {
  user?: {
    lastName?: Order;
    firstName?: Order;
    middleName?: Order;
    workDepartment?: Order;
    workEmploymentType?: Order;
  }|undefined,
  date?: string|date|undefined;
};


type Field = 'lastName'|'firstName'|'middleName'|'workDepartment'|'workEmploymentType';
