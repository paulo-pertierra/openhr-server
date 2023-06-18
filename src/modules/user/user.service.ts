import { PrismaClientValidationError } from '@prisma/client/runtime';
import { prisma } from '../../utilities/databaseHandler';

export async function findAllUsers() {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function findUserByUuId(uuid: string) {
  return await prisma.user.findUnique({
    where: {
      uuid
    },
    include: {
      training: true,
      emergencyContact: true
    }
  });
}

import type { Field, Order } from '../../utilities/types';
export async function sortUsersBy(field: Field, order: Order = 'desc') {
  try {
    return await prisma.user.findMany({
      orderBy: {
        [field]: order
      }
    });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      console.log('huh');
    }
  }
}

import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
export async function createUser(data: User) {
  return await prisma.user.create({
    data: {
      ...data,
      password: bcrypt.hashSync(data.password, 11)
    }
  });
}

export async function deleteUserByUuid(uuid: string) {
  await prisma.user.delete({
    where: {
      uuid
    }
  });
}

export async function updateUserByUuid(data: User, uuid: string) {
  return await prisma.user.update({
    where: {
      uuid
    },
    data
  });
}
