/**
 * This is the service. All important business-domain backend logic shall be here.
 */

import { prisma } from '../../utilities/databaseHandler';

export const countAdmin = async () => {
  return 0 === (await prisma.admin.count());
};
