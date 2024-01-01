import { Router } from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';

const router = Router();

router.get('/', courseControllers.getAllCourses);

router
  .route('/:courseId')
  .patch(
    validateRequest(courseValidations.updateCourseValidationSchema),
    courseControllers.updateCourse,
  );

router
  .route('/:courseId/reviews')
  .get(courseControllers.getSingleCourseWithReviews);

export const coursesRoutes = router;
