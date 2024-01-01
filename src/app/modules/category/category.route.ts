import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categoryControllers } from './category.controller';
import { categoryValidations } from './category.validation';
import auth from '../../middlewares/auth';

const router = Router();

router
  .route('/')
  .post(
    auth('admin'),
    validateRequest(categoryValidations.createCategoryValidationSchema),
    categoryControllers.createCategory,
  )
  .get(categoryControllers.getAllCategories);

export const categoryRoutes = router;
