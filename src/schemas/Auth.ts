import { z } from 'zod';

export const AuthLoginSchema = z.object({
    correo: z.string().email(),
    clave: z.string()
})

export const AuthForgotPasswordSchema = z.object({
    email: z.string().email()
})

export const AuthChangePasswordSchema = z.object({
    password: z.string(),
    repeatPassword: z.string()
})