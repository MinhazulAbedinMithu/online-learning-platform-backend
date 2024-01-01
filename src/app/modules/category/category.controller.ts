import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserModel } from '../user/user.model';
import { categoryServices } from './category.service';

const createCategory = catchAsync(async (req, res, next) => {
  const user = await UserModel.isUserExist(req.user.username);
  const newCat = await categoryServices.createCategory({
    ...req.body,
    createdBy: user._id,
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: newCat,
  });
});

const getAllCategories = catchAsync(async (req, res, next) => {
  const result = await categoryServices.getAllCategories();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategories,
};
