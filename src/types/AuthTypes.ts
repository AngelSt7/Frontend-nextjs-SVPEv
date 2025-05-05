import { z } from 'zod';
import { AuthChangePasswordSchema, AuthForgotPasswordSchema, AuthLoginSchema } from "../schemas/Auth";

export type AuthLogin = z.infer<typeof AuthLoginSchema>
export type AuthForgotPassword = z.infer<typeof AuthForgotPasswordSchema>
export type AuthChangePassword = z.infer<typeof AuthChangePasswordSchema>