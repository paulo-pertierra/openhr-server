/**
 * This is the service. All important business-domain backend logic shall be here.
 */

import { prisma } from '../../utilities/databaseHandler';

export async function findAllUsers(): Promise<Omit<User[] | null, 'password'>> {
  return await prisma.user.findMany({
    select: {
      uuid: true,
      username: true,
      lastName: true,
      firstName: true,
      middleName: true,
      contactEmail: true,
      contactNumber: true,
      profileGender: true,
      profileBirthday: true,
      profileCivilStatus: true,
      profileNationality: true,
      profileAddress: true,
      educationLevel: true,
      educationCourse: true,
      educationYearStart: true,
      educationYearGraduate: true,
      educationSchool: true,
      workRole: true,
      workDepartment: true,
      workTitle: true,
      workCode: true,
      workEmploymentType: true,
      workHireDate: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function findUserByUuId(uuid: string): Promise<Omit<User | null, 'password'> | null> {
  return await prisma.user.findUnique({
    select: {
      uuid: true,
      username: true,
      lastName: true,
      firstName: true,
      middleName: true,
      contactEmail: true,
      contactNumber: true,
      profileGender: true,
      profileBirthday: true,
      profileCivilStatus: true,
      profileNationality: true,
      profileAddress: true,
      educationLevel: true,
      educationCourse: true,
      educationYearStart: true,
      educationYearGraduate: true,
      educationSchool: true,
      workRole: true,
      workDepartment: true,
      workTitle: true,
      workCode: true,
      workEmploymentType: true,
      workHireDate: true,
      training: true,
      emergencyContact: true,
      createdAt: true,
      updatedAt: true
    },
    where: {
      uuid
    }
  });
}

export async function findUsersByFilter(
  field: Field,
  value: string
): Promise<Omit<User[] | null, 'password'>> {
  return await prisma.user.findMany({
    select: {
      uuid: true,
      username: true,
      lastName: true,
      firstName: true,
      middleName: true,
      contactEmail: true,
      contactNumber: true,
      profileGender: true,
      profileBirthday: true,
      profileCivilStatus: true,
      profileNationality: true,
      profileAddress: true,
      educationLevel: true,
      educationCourse: true,
      educationYearStart: true,
      educationYearGraduate: true,
      educationSchool: true,
      workRole: true,
      workDepartment: true,
      workTitle: true,
      workCode: true,
      workEmploymentType: true,
      workHireDate: true,
      createdAt: true,
      updatedAt: true
    },
    where: {
      [field as unknown as string]: value
    }
  });
}

import type { Order } from '../../utilities/types';
import type { Field } from './user.types';
export async function findAllUsersAndSortBy(
  field: Field,
  order: Order = 'desc'
): Promise<Omit<User[] | null, 'password'>> {
  return await prisma.user.findMany({
    select: {
      uuid: true,
      username: true,
      lastName: true,
      firstName: true,
      middleName: true,
      contactEmail: true,
      contactNumber: true,
      profileGender: true,
      profileBirthday: true,
      profileCivilStatus: true,
      profileNationality: true,
      profileAddress: true,
      educationLevel: true,
      educationCourse: true,
      educationYearStart: true,
      educationYearGraduate: true,
      educationSchool: true,
      workRole: true,
      workDepartment: true,
      workTitle: true,
      workCode: true,
      workEmploymentType: true,
      workHireDate: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      [field]: order
    }
  });
}

import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
export async function createUser(data: Omit<User, 'uuid'>): Promise<any> {
  return await prisma.user.create({
    select: {
      uuid: true,
      username: true,
      createdAt: true,
      updatedAt: true
    },
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
    select: {
      uuid: true,
      username: true,
      lastName: true,
      firstName: true,
      middleName: true,
      contactEmail: true,
      contactNumber: true,
      profileGender: true,
      profileBirthday: true,
      profileCivilStatus: true,
      profileNationality: true,
      profileAddress: true,
      educationLevel: true,
      educationCourse: true,
      educationYearStart: true,
      educationYearGraduate: true,
      educationSchool: true,
      workRole: true,
      workDepartment: true,
      workTitle: true,
      workCode: true,
      workEmploymentType: true,
      workHireDate: true,
      createdAt: true,
      updatedAt: true
    },
    where: {
      uuid
    },
    data: {
      ...data,
      password: bcrypt.hashSync(data.password, 11)
    }
  });
}
