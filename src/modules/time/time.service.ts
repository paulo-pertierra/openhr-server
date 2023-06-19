/**
 * This is the service. All important business-domain backend logic shall be here.
 */

import { prisma } from '../../utilities/databaseHandler';
import * as dateFns from 'date-fns';
import { Order } from '../../utilities/types';
import { Field, OrderBy, TimeSchemaDataObj } from './time.types';
import { timingEngine } from './time.engine';

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
  // Create a time record for all users at the start of the day.
  return await prisma.time.createMany({
    data: users.map((user) => {
      return {
        userId: user.uuid,
        date: dateFns.format(new Date(), 'yyyy-MM-dd')
      };
    })
  });
}

export async function recordTime(userId: string) {
  // Time in User from 6:30am to 8:30am
  const data: TimeSchemaDataObj = timingEngine(new Date());
  const timeRecord = await prisma.time.findFirst({
    where: {
      userId,
      date: dateFns.format(new Date(), 'YYYY-MM-DD')
    }
  });
  await prisma.time.update({
    where: {
      id: timeRecord?.id
    },
    data
  });
}

export async function sortTimesBy(field: Field, order: Order) {
  const orderBy: OrderBy = {};
  if (orderBy.user) orderBy.user[field] = order;
  if (orderBy.date) orderBy.date = order;

  return await prisma.time.findMany({
    include: {
      user: {
        select: {
          lastName: true,
          firstName: true,
          middleName: true,
          workDepartment: true,
          workEmploymentType: true
        }
      }
    },
    orderBy
  });
}

export async function getTimes() {
  return await prisma.time.findMany({
    include: {
      user: {
        select: {
          lastName: true,
          firstName: true,
          middleName: true,
          workDepartment: true,
          workEmploymentType: true
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  });
}
