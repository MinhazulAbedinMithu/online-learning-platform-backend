import { z } from 'zod';

const moduleSchema = z.object({
  title: z.string(),
  type: z.enum(['Live Class', 'Assignment', 'Test', 'Support Class']),
  src: z.string(),
});

const milestoneSchema = z.object({
  title: z.string(),
  modules: z.array(moduleSchema),
});

const tagSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => !!data, { message: 'tag name is Required' }),
  isDeleted: z.boolean().default(false),
});

const detailSchema = z.object({
  level: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => !!data, { message: 'course level is Required' }),
  description: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => !!data, { message: 'course description is Required' }),
});

const instructorSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => !!data, { message: 'instructor name is Required' }),
  photo: z.string().optional(),
  designation: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => !!data, { message: 'designation is Required' }),
  organization: z.string().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1)
      .max(255)
      .refine((data) => !!data, { message: 'title is Required' }),
    categoryId: z
      .string()
      .refine((data) => !!data, { message: 'categoryId is Required' }),
    price: z
      .number()
      .refine((data) => !!data, { message: 'price is Required' }),
    tags: z.array(tagSchema),
    startDate: z
      .string()
      .refine((data) => !!data, { message: 'startDate is Required' }),
    endDate: z.string().optional(),
    details: detailSchema.refine((data) => !!data, {
      message: 'course details is Required',
    }),
    thumbnail: z
      .string()
      .refine((data) => !!data, { message: 'thumbnail is Required' }),
    sits: z.number().refine((data) => !!data, { message: 'sits is Required' }),
    promo: z.string().optional(),
    instructor: z.array(instructorSchema).refine((data) => data.length > 0, {
      message: 'at least one instructor is Required',
    }),
    requirements: z.array(z.string()),
    benifits: z.array(z.string()),
    studyPlan: z
      .array(milestoneSchema)
      .refine((data) => data.length > 0, { message: 'study plan is Required' }),
    createdBy: z
      .string()
      .refine((data) => !!data, { message: 'createdBy is Required' }),
    isDeleted: z.boolean().default(false),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  // updateCourseValidationSchema,
};
