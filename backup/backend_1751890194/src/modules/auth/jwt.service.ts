


import jwt from 'jsonwebtoken';
import redisClient from '../../services/redis';

const JWT_EXPIRY = '1d';

interface JwtPayload {
  phone: string;
  iat: number;
  exp: number;
}

export const createJWT = (phone: string): string => {
  return jwt.sign(
    { phone },
    process.env.JWT_SECRET!,
    { expiresIn: JWT_EXPIRY }
  );
};

export const verifyJWT = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
};

export const blacklistToken = async (token: string, expiry: number): Promise<void> => {
  await redisClient.set(`jwt:blacklist:${token}`, '1', { EX: expiry });
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  return (await redisClient.get(`jwt:blacklist:${token}`)) === '1';
};


