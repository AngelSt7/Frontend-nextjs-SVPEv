import { z } from 'zod';
import { AuthChangePasswordSchema, AuthForgotPasswordSchema, AuthInitPasswordSchema, AuthLoginSchema, AuthUserInfoSchema } from "../schemas/Auth";

export type AuthLogin = z.infer<typeof AuthLoginSchema>
export type AuthUserInfo = z.infer<typeof AuthUserInfoSchema>
export type AuthInitPassword = z.infer<typeof AuthInitPasswordSchema>
export type AuthForgotPassword = z.infer<typeof AuthForgotPasswordSchema>
export type AuthChangePassword = z.infer<typeof AuthChangePasswordSchema>