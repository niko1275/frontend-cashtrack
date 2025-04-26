import { z } from 'zod'

export const confirmTokenSchema = z.object({
    token: z.string()
        .min(6, 'El token debe tener 6 dígitos')
        .max(6, 'El token debe tener 6 dígitos')
        .regex(/^\d+$/, 'El token solo debe contener números')
})

export type ConfirmTokenFormData = z.infer<typeof confirmTokenSchema> 

export const loginSchema = z.object({
    email: z.string().email('El email no es válido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
})

export type LoginFormData = z.infer<typeof loginSchema>



export const UserSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    email: z.string().email()
})
        
export type User = z.infer<typeof UserSchema>


export const ForgotPasswordSchema = z.object({
    email: z.string()   
            .min(1, {message: 'El Email es Obligatorio'})
            .email( {message: 'Email no válido'}),
})


export const ResetPasswordSchema = z.object({
    password: z.string()
            .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

