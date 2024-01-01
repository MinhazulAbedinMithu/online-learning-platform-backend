import express, { Request, Response } from 'express';
import cors from 'cors';
import notFoundHandler from './app/middlewares/notFoundHandler';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { courseRoutes } from './app/modules/course/course.route';
import { categoryRoutes } from './app/modules/category/category.route';
import { reviewRoutes } from './app/modules/review/review.route';
import { coursesRoutes } from './app/modules/course/courses.route';
import { authRoutes } from './app/modules/user/user.route';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.get('/', (req: Request, res: Response) => {
  res.json('App is live');
});

app.use(globalErrorHandler);
app.use(notFoundHandler);
export default app;
