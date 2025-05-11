"use server"

import { confirmTokenSchema } from '@/src/schemas/auth'
import { cookies } from 'next/headers'

type ActionStateType = {
    errors: string[],
    success:string
} 

export async function cambiarContraseñaPerfil(prevState: ActionStateType, formData: FormData) {
    
    const current_password = formData.get('current_password') as string
    const password = formData.get('password') as string
    const password_confirmation = formData.get('password_confirmation') as string
    
    console.log(password,password_confirmation)
    console.log(current_password)
    if(password !== password_confirmation){
        return {
            errors: ['Las contraseñas no coinciden'],
            success:''
        }
    }
    
    try {   
        const cookieStore = await cookies()
        const token = cookieStore.get('CASHTRACKR_TOKEN')?.value

        const url = `${process.env.API_URL}/auth/update-password`
        const req = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({

            password:current_password,
            password_confirm:password_confirmation
            })
        })

        const json = await req.json()
        if (!req.ok) {
            return {
                errors: [json.error],
                success:''
            }
        }
        return {
            errors: [],
            success:json as string
        }
    } catch (error) {
        console.error('Error en la validación:', error)
        return {
            errors: ['Ocurrió un error al validar el token'],
            success:''
        }
    }
}

