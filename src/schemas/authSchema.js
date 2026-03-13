import { z } from "zod";

export const registerSchema = z.object({
  usuario: z.string({
    required_error: 'usuario es requerido'
  }).min(6,{
      message:'el usuario debe tener al menos 6 caracteres'
    }),

  email: z.string(
    {required_error: 'email es requerido'}
  )
    .email({message:'el email es inválido'}),
  
  password: z.string({
    required_error: 'la contraseña es requerida'}).min(6,{
      message:'la contraseña debe tener al menos 6 caracteres'
    })
})

export const loginSchema = z.object({
  email: z.string({
    required_error:'el email es requerido'
  }).email({
    message: 'email inválido'
  }),
  password: z.string({
    required_error:'la contraseña es requerida'
  }).min(6,{
    message:'la contraseña debe tener al menos 6 caracteres'
  })
})