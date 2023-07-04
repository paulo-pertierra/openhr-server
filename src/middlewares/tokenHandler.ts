import dotenv from 'dotenv';
dotenv.config();

import { sign, verify } from 'jsonwebtoken';
import { AuthError } from '../modules/auth/auth.errors';

const ADMIN_SECRET_KEY: string =
  process.env.ADMIN_SECRET_KEY ||
  'dontleakdontleakdontleakdontleakdontleakdontleakdontleakdontleakdontleakdontleak';
export const generateAdminToken = (userId: string) => {
  return sign({ userId }, ADMIN_SECRET_KEY, { expiresIn: '1h' });
};

export const validateAdminToken = (jwt: string) => {
  return verify(jwt, ADMIN_SECRET_KEY);
};

const SECRET_KEY: string = process.env.SECRET_KEY || 'secret';
export const generateUserToken = (userId: string) => {
  return sign({ userId }, SECRET_KEY, { expiresIn: '12h' });
};

export const validateUserToken = (jwt: string) => {
  return verify(jwt, SECRET_KEY);
};

export const validateAllToken = (jwt: string) => {
  try {
    return verify(jwt, ADMIN_SECRET_KEY);
  } catch (error) {
    try {
      return verify(jwt, SECRET_KEY);
    } catch (error) {
      throw new AuthError('User is not logged in as any role.');
    }
  }
};
