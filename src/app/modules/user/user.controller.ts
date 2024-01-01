import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const registerUser = catchAsync(async (req, res, next) => {
  const result = await userServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.loginUser(req.body);
  const { existUser, refreshToken, accessToken } = result;

  const responseUser = {
    _id: existUser._id,
    username: existUser.username,
    email: existUser.email,
    role: existUser.role,
  };

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successful',
    data: {
      user: responseUser,
      token: accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await userServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  });
});

const getProfileDetails = catchAsync(async (req, res) => {
  const result = await userServices.getProfileDetails(req.user.username);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Show Profile Details',
    data: result,
  });
});

const updateProfileDetails = catchAsync(async (req, res) => {
  const result = await userServices.updateProfileDetails(
    req.user.username,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile Updated successfully',
    data: result,
  });
});

const logoutUser = catchAsync(async (req, res) => {
  res.clearCookie('token');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged out successfully',
    data: null,
  });
});

export const userControllers = {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  getProfileDetails,
  updateProfileDetails,
};
