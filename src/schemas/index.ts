import {z} from 'zod'
import { UserSchema } from './auth'

export const registerSchema = z.object({
    email: z.string().min(1,{message:"El email es obligatorio"}).email({message:'Email no valido'}),
    nombre: z.string().min(1,{message:"Tu nombre no puede ir vacio"}),
    password:z.string().min(8,{message:"El password es muy corto, Minimo 8 caracteres"}), 
    password_confirmation:z.string(),
}).refine((data)=>data.password===data.password_confirmation,{
    message:"Los password no son iguales",
    path:['password_confirmation']
})


export const SuccessSchema = z.string().min(1,{message:"Valor no valido"})


export const DraftBudgetSchema = z.object({
    nombre: z.string()
            .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
    cantidad: z.coerce.
            number({message: 'Cantidad no válida'})
            .min(1, {message: 'Cantidad no válida'}),
})


export const DraftGastoSchema = z.object({
    nombre: z.string()
            .min(1, {message: 'El Nombre del Gasto es obligatorio'}),
    cantidad: z.coerce.
            number({message: 'Cantidad no válida'})
            .min(1, {message: 'Cantidad no válida'}),
})