import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewServices } from './review.service';

const createReview = catchAsync(async (req, res, next) => {
  const newReview = await reviewServices.createReview(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data: newReview,
  });
});
export const reviewControllers = {
  createReview,
};
