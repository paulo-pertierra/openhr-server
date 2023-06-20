import * as dateFns from 'date-fns';
import { prisma } from './databaseHandler';

export async function createTime() {
  const users = await prisma.user.findMany({
    select: {
      uuid: true
    },
    where: {
      time: {
        none: {
          date: dateFns.format(new Date(), 'yyyy-MM-dd')
        }
      }
    }
  });
  return await prisma.time.createMany({
    data: users.map((user) => {
      return {
        userId: user.uuid,
        date: dateFns.format(new Date(), 'yyyy-MM-dd')
      };
    })
  });
}
