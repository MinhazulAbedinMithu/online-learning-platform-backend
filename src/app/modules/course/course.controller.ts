import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserModel } from '../user/user.model';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res, next) => {
  const user = await UserModel.isUserExist(req.user.username);
  const createdCourse = await courseServices.createCourse({
    ...req.body,
    createdBy: user._id,
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: createdCourse,
  });
});

const getAllCourses = catchAsync(async (req, res, next) => {
  const retrievedCourses = await courseServices.getAllCourses(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    data: retrievedCourses,
  });
});

const updateCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const updatedCourse = await courseServices.updateCourse(courseId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: updatedCourse,
  });
});

const getSingleCourseWithReviews = catchAsync(async (req, res, next) => {
  const courseId: string = req.params.courseId;
  const retrievedCourseWithReviews =
    await courseServices.getSingleCourseWithReviews(courseId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    data: retrievedCourseWithReviews,
  });
});

const getBestCourseBasedOnReviews = catchAsync(async (req, res, next) => {
  const retrievedBestCourse =
    await courseServices.getBestCourseBasedOnReviews();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Best course retrieved successfully',
    data: retrievedBestCourse,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourses,
  updateCourse,
  getSingleCourseWithReviews,
  getBestCourseBasedOnReviews,
};
