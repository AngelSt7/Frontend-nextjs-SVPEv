import { z } from 'zod';

export const AuthLoginSchema = z.object({
    correo: z.string().email(),
    clave: z.string()
})

export const AuthForgotPasswordSchema = z.object({
    email: z.string().email()
})

export const AuthUserInfoSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  correo: z.string().email(),
  activo: z.boolean(),
})

export const AuthInitPasswordSchema = z.object({
    clave_actual: z.string(),
    clave_nueva: z.string(),
    repeat_clave_nueva: z.string()
})

export const AuthChangePasswordSchema = z.object({
    password: z.string(),
    repeatPassword: z.string()
})