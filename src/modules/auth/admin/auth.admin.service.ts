import { Admin, Prisma } from '@prisma/client';
import { prisma } from '../../../utilities/databaseHandler';
import * as tokenHandler from '../../../middlewares/tokenHandler';
import { AuthError } from '../auth.errors';
import bcrypt from 'bcrypt';

export async function registerAdmin(data: Omit<Admin, 'uuid'>) {
  await prisma.admin.create({
    data: {
      ...data,
      password: bcrypt.hashSync(data.password, 11)
    }
  });
}

export async function loginAdmin(username: string, password: string) {
  const admin = await prisma.admin.findUnique({
    where: {
      username
    },
  });
  if (admin === null) {
    throw new AuthError('Username provided was incorrect.');
  }
  if (!bcrypt.compareSync(password, admin.password)) {
    throw new AuthError('Password provided was incorrect.');
  }
  return {
    uuid: admin.uuid,
    jwt: tokenHandler.generateAdminToken(admin.uuid),
    admin: {
      email: admin.email,
      lastName: admin.lastName,
      firstName: admin.firstName,
      middleName: admin.middleName
    }
  };
}
