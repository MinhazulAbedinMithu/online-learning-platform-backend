import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from './user.interface';

export const createToken = (
  jwtPayload: { username: string; role: TUserRole },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
