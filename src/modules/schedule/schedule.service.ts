import { Schedule, Status } from '@prisma/client';
import { prisma } from '../../utilities/databaseHandler';
import { startOfYear, endOfYear, startOfMonth, endOfMonth } from 'date-fns';

export async function createSchedule(data: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>) {
  return await prisma.schedule.create({
    data
  });
}

export async function deleteScheduleByUuid(id: string) {
  return await prisma.schedule.delete({
    where: {
      id
    }
  });
}

export async function updateScheduleByUuid(status: Status, id: string) {
  return await prisma.schedule.update({
    where: {
      id
    },
    data: {
      status
    },
  });
}

export async function findManySchedulesYearly(date: Date = new Date()) {
  return await prisma.schedule.findMany({
    where: {
      start: {
        gte: startOfYear(date),
        lte: endOfYear(date)
      }
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function findManySchedulesMonthly(date: Date = new Date()) {
  return await prisma.schedule.findMany({
    where: {
      start: {
        gte: startOfMonth(date),
        lte: endOfMonth(date)
      }
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function findAllSchedules() {
  return await prisma.schedule.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function findManySchedulesByUserUuid(userUuid: string) {
  return await prisma.schedule.findMany({
    where: {
      userUuid
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}