/**
 * This is the service. All important business-domain backend logic shall be here.
 */

import { prisma } from '../../utilities/databaseHandler';
import * as dateFns from 'date-fns';
import { Order } from '../../utilities/types';
import { Field, OrderBy } from './time.types';

export async function createTime(userId: string) {
  // Create a time record for all users at the start of the day.
  return await prisma.time.create({
    data: {
      userId,
      date: dateFns.format(new Date(), 'YYYY-MM-DD')
    }
  });
}

export async function timeInAm(userId: string) {
  // Time in User from 6:30am to 8:30am
  const currentTime = dateFns.formatISO(new Date());
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
    data: {
      timeInAm: currentTime
    }
  });
}

export async function timeOutAm(userId: string) {
  // Time out User from 9:30pm to 12:00pm
  const currentTime = dateFns.formatISO(new Date());
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
    data: {
      timeOutAm: currentTime
    }
  });
}

export async function timeInPm(userId: string) {
  // Time in User from 12:01pm to 1:30pm
  const currentTime = dateFns.formatISO(new Date());
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
    data: {
      timeInPm: currentTime
    }
  });
}

export async function timeOutPm(userId: string) {
  // Time out user from 2:30pm to 5:00pm
  const currentTime = dateFns.formatISO(new Date());
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
    data: {
      timeOutPm: currentTime
    }
  });
}

export async function sortTimesBy(field: Field, order: Order) {

  const orderBy:OrderBy = {};
  if (orderBy.user) orderBy.user[field] = order
  if (orderBy.date) orderBy.date = order

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
      },
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
      },
    },
    orderBy: {
      date: 'desc'
    }
  })
}