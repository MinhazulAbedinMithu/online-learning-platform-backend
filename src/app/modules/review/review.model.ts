import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    required: [true, 'courseId is Required'],
  },
  rating: {
    type: Number,
    required: [true, 'rating is Required'],
    max: [5, 'rating falls withing range of 1 to 5'],
    min: [1, 'rating falls withing range of 1 to 5'],
  },
  review: {
    type: String,
    required: [true, 'review is Required'],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

const ReviewModel = model<TReview>('Review', reviewSchema);
export default ReviewModel;
