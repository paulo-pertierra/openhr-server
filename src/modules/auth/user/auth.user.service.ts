import { Admin, Prisma } from '@prisma/client';
import { prisma } from '../../../utilities/databaseHandler';
import * as tokenHandler from '../../../middlewares/tokenHandler';
import { AuthError } from '../auth.errors';
import bcrypt from 'bcrypt';

export async function loginUser(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });
  if (user === null) {
    throw new AuthError('Username provided was incorrect.');
  }
  if (!bcrypt.compareSync(password, user.password)) {
    throw new AuthError('Password provided was incorrect.');
  }
  return {
    uuid: user.uuid,
    role: 'USER',
    jwt: tokenHandler.generateUserToken(user.uuid),
    admin: {
      email: user.contactEmail,
      lastName: user.lastName,
      firstName: user.firstName,
      middleName: user.middleName
    }
  };
}
