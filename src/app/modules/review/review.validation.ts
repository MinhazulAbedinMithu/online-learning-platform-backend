import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string({
      invalid_type_error: 'course courseId is must be string',
      required_error: 'courseId is Required',
    }),
    rating: z
      .number({
        invalid_type_error: 'course rating between 1 to 5',
        required_error: 'rating is Required',
      })
      .min(1)
      .max(5),
    review: z.string({
      invalid_type_error: 'course review is must be string',
      required_error: 'review is Required',
    }),
    createdBy: z.string()
  }),
});

export const reviewValications = {
  createReviewValidationSchema,
};
