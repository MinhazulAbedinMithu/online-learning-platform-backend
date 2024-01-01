import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    fullName: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    role: z.enum(['user', 'admin']).default('user').optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

const changePasswordUserValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
  }),
});

export const userValidations = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  changePasswordUserValidationSchema,
};
