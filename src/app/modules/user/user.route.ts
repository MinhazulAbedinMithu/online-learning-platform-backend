import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE, TUserRole } from './user.interface';
import { userValidations } from './user.validation';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidations.registerUserValidationSchema),
  userControllers.registerUser,
);

router.post(
  '/login',
  validateRequest(userValidations.loginUserValidationSchema),
  userControllers.loginUser,
);

router.post(
  '/update-password',
  auth(USER_ROLE.admin as TUserRole, USER_ROLE.user as TUserRole),
  validateRequest(userValidations.changePasswordUserValidationSchema),
  userControllers.changePassword,
);

router.get(
  '/profile',
  auth(USER_ROLE.admin as TUserRole, USER_ROLE.user as TUserRole),
  userControllers.getProfileDetails,
);

router.patch(
  '/update-profile',
  auth(USER_ROLE.admin as TUserRole, USER_ROLE.user as TUserRole),
  userControllers.updateProfileDetails,
);

router.post(
  '/logout',
  auth(USER_ROLE.admin as TUserRole, USER_ROLE.user as TUserRole),
  userControllers.logoutUser,
);

export const authRoutes = router;
