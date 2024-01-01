import { Model } from 'mongoose';

export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

export interface IUser {
  _id?: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  phone: string;
  altEmail?: string;
  altPhone?: string;
  enrollCourses?: any[];
  isDeleted: boolean;
}

export type TLoginUser = {
  username: string;
  password: string;
};

export type TUserChangePassword = {
  currentPassword: string;
  newPassword: string;
};

export interface IUserModel extends Model<IUser> {
  isUserExist(username: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
