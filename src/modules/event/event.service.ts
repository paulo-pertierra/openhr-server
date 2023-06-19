import { Event } from '@prisma/client';
import { prisma } from '../../utilities/databaseHandler';
import { Order } from '../../utilities/types';

export async function findAllEvents() {
  return await prisma.event.findMany();
}

export async function findEventsByUser(userUuid: string) {
  return await prisma.event.findMany({
    where: {
      userUuid
    }
  });
}

export async function findAllEventsAndSortBy(field: any, order: Order) {
  return await prisma.event.findMany({
    orderBy: {
      [field]: order
    }
  });
}

export async function createEvent(data: Event) {
  return await prisma.event.create({
    data
  })
}
