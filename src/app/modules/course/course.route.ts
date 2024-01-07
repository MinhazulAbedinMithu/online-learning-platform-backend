import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { courseControllers } from './course.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get('/', courseControllers.getAllCourses);

// router
//   .route('/:courseId')
//   .put(
//     auth('admin'),
//     validateRequest(courseValidations.updateCourseValidationSchema),
//     courseControllers.updateCourse,
//   );

router
  .route('/:courseId/reviews')
  .get(courseControllers.getSingleCourseWithReviews);

router.get('/best', courseControllers.getBestCourseBasedOnReviews);

export const courseRoutes = router;
