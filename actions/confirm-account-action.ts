"use server"

import { confirmTokenSchema } from '@/src/schemas/auth'

type ActionStateType = {
    errors: string[],
    success:string
} 

export async function confirm(prevState: ActionStateType, formData: FormData) {
    const token = formData.get('token') as string
    
    try {
        const result = confirmTokenSchema.safeParse({ token })
        
        if (!result.success) {
            return {
                errors: result.error.errors.map(error => error.message),
                success:""
            }
        }
        console.log('Token válido:', token)

        const url = `${process.env.API_URL}/auth/confirm-account`
        const req = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            token:token
            })
        })

        const json = await req.json()
        if (!req.ok) {
            return {
                errors: [json.error],
                success:'false'
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

