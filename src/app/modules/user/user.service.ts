import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import {
  IUser,
  TLoginUser,
  TUserChangePassword,
  TUserRole,
} from './user.interface';
import { UserModel } from './user.model';
import { createToken } from './user.utils';

const registerUser = async (payload: IUser) => {
  const existUser = await UserModel.isUserExist(payload.username);
  if (existUser) {
    throw new AppError(400, 'User already exist');
  }
  const registerdUser = await UserModel.create(payload);

  return registerdUser;
};

const loginUser = async (payload: TLoginUser) => {
  const existUser = await UserModel.isUserExist(payload.username);
  if (!existUser) {
    throw new AppError(404, 'User Does not Exist');
  }
  if (existUser.isDeleted) {
    throw new AppError(403, 'User is Deleted');
  }

  const matchPassword = await UserModel.isPasswordMatched(
    payload.password,
    existUser.password,
  );

  if (!matchPassword) {
    throw new AppError(403, 'Password does not matched');
  }

  // Create Token
  const jwtPayload = {
    username: existUser.username,
    role: existUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    existUser,
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TUserChangePassword,
) => {
  const existUser = await UserModel.isUserExist(userData.username);

  if (!existUser) {
    throw new AppError(404, 'User not Found !!!');
  }

  if (existUser.isDeleted) {
    throw new AppError(403, 'User is Deleted');
  }

  const matchPassword = await UserModel.isPasswordMatched(
    payload.currentPassword,
    existUser.password,
  );

  if (!matchPassword) {
    throw new AppError(403, 'Password does not matched');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await UserModel.findOneAndUpdate(
    {
      username: userData.username,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

const getProfileDetails = async (username: string) => {
  const profile = await UserModel.isUserExist(username);
  return profile;
};

const updateProfileDetails = async (
  username: string,
  payload: Partial<IUser>,
) => {
  const profile = await UserModel.findOneAndUpdate({ username }, payload, {
    new: true,
    runValidators: true,
  });
};

export const userServices = {
  registerUser,
  loginUser,
  changePassword,
  getProfileDetails,
  updateProfileDetails,
};
