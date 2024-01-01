import { Router } from 'express';
import { reviewControllers } from './review.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.route('/').post(auth('user'), reviewControllers.createReview);

export const reviewRoutes = router;
