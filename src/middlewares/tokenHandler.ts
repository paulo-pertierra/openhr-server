import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const SECRET_KEY: string = process.env.SECRET_KEY || 'secret';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const validateToken = (jwt: string) => {};
