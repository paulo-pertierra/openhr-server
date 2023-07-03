/**
 * This is the service. All important business-domain backend logic shall be here.
 */

import { prisma } from '../../utilities/databaseHandler';
import * as dateFns from 'date-fns';
import { Order } from '../../utilities/types';
import { Field, FieldWithDate, OrderBy, TimeSchemaDataObj } from './time.types';
import { timingEngine } from './time.engine';
import { Time } from '@prisma/client';
import { AuthError } from '../auth/auth.errors';

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
  const currentTime = new Date();
  const timeTo: string = timingEngine(currentTime);
  const timeRecord = await prisma.time.findFirst({
    where: {
      userId,
      date: dateFns.format(new Date(), 'yyyy-MM-dd')
    }
  });

  if (timeRecord && timeRecord.timeInAm && timeRecord.timeOutAm) {
    calculateHoursWorkedAm(timeRecord);
  }

  if (timeRecord && timeRecord.timeInPm && timeRecord.timeOutPm) {
    calculateHoursWorkedPm(timeRecord);
  }

  if (timeTo === 'timeInAm' && timeRecord?.timeInAm !== null) {
    throw new AuthError('Looks like there is already a morning time in record.');
  }
  if (timeTo === 'timeOutAm' && timeRecord?.timeOutAm !== null) {
    throw new AuthError('Looks like there is already a morning time out record.');
  }
  if (timeTo === 'timeInPm' && timeRecord?.timeInPm !== null) {
    throw new AuthError('Looks like there is already an afternoon time in record.');
  }
  if (timeTo === 'timeOutPm' && timeRecord?.timeOutPm !== null) {
    throw new AuthError('Looks like there is already an afternoon time out record.');
  }

  return await prisma.time.update({
    where: {
      id: timeRecord?.id
    },
    data: {
      [timeTo]: currentTime
    }
  });
}

export async function findManyTimesAndSortBy(
  field: FieldWithDate,
  order: Order = 'asc',
  date: string = dateFns.format(new Date(), 'yyyy-MM-dd')
) {
  let orderBy: OrderBy = {};
  if (field === 'date') {
    orderBy = {
      date: order
    };
  } else {
    console.log(field);
    orderBy = {
      user: {
        [field]: order
      }
    };
  }

  return await prisma.time.findMany({
    where: {
      date
    },
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

export async function findAllTimes(date: string = dateFns.format(new Date(), 'yyyy-MM-dd')) {
  return await prisma.time.findMany({
    where: {
      date
    },
    include: {
      user: {
        select: {
          uuid: true,
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

export async function findTimesByUserUuid(userId: string) {
  return await prisma.time.findMany({
    where: {
      userId
    }
  })
}

// Calculate hours
async function calculateHoursWorkedAm(time: Time) {
  await prisma.time.update({
    where: {
      id: time.id
    },
    data: {
      hoursWorkedAm: Math.abs(dateFns.differenceInHours(time.timeInAm!, time.timeOutAm!))
    }
  });
}

async function calculateHoursWorkedPm(time: Time) {
  await prisma.time.update({
    where: {
      id: time.id
    },
    data: {
      hoursWorkedAm: Math.abs(dateFns.differenceInHours(time.timeInPm!, time.timeOutPm!))
    }
  });
}
