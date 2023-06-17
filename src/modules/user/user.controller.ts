/* This is the Controller. All internal logic should be here.
 * Bleeding the logic to other areas will make
 * working with business logic unmaintainable. Beware!
 * Further reading: Developer Documentation.
*/

import { Field, Order } from "../../utilities/types";
import * as userService from "./user.service"

export function findAllUsers() {
  return userService.findAllUsers();
}

export function sortUsersBy(field:Field, order:Order) {
  return userService.sortUsersBy(field, order);
}