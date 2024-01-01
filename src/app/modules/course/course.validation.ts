import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const tagvalidationSchema = z.object({
  name: z.string().min(1),
  isDeleted: z.boolean().default(false).optional(),
});

const courseDetailsValidationSchema = z.object({
  level: z.string().min(1),
  description: z.string().min(5),
});

const courseDetailsUpdateValidationSchema = z.object({
  level: z.string().min(1).optional(),
  description: z.string().min(5).optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagvalidationSchema),
    startDate: z.string().refine((value) => dateRegex.test(value), {
      message: 'Invalid date format. Use "YYYY-MM-DD".',
    }),
    endDate: z.string().refine((value) => dateRegex.test(value), {
      message: 'Invalid date format. Use "YYYY-MM-DD".',
    }),
    language: z.string(),
    provider: z.string(),
    durationInWeeks: z.number().optional(),
    details: courseDetailsValidationSchema,
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(tagvalidationSchema).optional(),
    startDate: z
      .string()
      .refine((value) => dateRegex.test(value), {
        message: 'Invalid date format. Use "YYYY-MM-DD".',
      })
      .optional(),
    endDate: z
      .string()
      .refine((value) => dateRegex.test(value), {
        message: 'Invalid date format. Use "YYYY-MM-DD".',
      })
      .optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: courseDetailsUpdateValidationSchema.optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
