import { z } from 'zod';

export const AuthLoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const AuthForgotPasswordSchema = z.object({
    email: z.string().email()
})

export const AuthChangePasswordSchema = z.object({
    password: z.string(),
    repeatPassword: z.string()
})