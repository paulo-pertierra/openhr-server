/**
 * This is the service. All important business-domain backend logic shall be here.
 */

import { prisma } from '../../utilities/databaseHandler';

export async function findAllUsers(): Promise<Omit<User[], 'password'>> {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function findUserByUuId(uuid: string): Promise<Omit<User, 'password'> | null> {
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

import type { Order } from '../../utilities/types';
import type { Field } from './user.types';
export async function findAllUsersAndSortBy(field: Field, order: Order = 'desc'): Promise<User[]> {
  return await prisma.user.findMany({
    orderBy: {
      [field]: order
    }
  });
}

import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
export async function createUser(data: User): Promise<Omit<User, 'password'>> {
  return await prisma.user.create({
    data: {
      ...data,
      password: bcrypt.hashSync(data.password, 11)
    }
  });
}

export async function deleteUserByUuid(uuid: string): Promise<void> {
  await prisma.user.delete({
    where: {
      uuid
    }
  });
}

export async function updateUserByUuid(data: User, uuid: string): Promise<Omit<User, 'password'>> {
  return await prisma.user.update({
    where: {
      uuid
    },
    data
  });
}
