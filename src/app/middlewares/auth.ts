import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../error/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { UserModel } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // console.log({ decoded });

    const { role, username, iat } = decoded;

    // checking if the user is exist
    const user = await UserModel.isUserExist(username);

    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(403, 'This user is deleted !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
