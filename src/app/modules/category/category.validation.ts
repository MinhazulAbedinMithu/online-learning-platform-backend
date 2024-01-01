import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

export const categoryValidations = {
  createCategoryValidationSchema,
};
