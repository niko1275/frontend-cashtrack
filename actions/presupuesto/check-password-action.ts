"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export default async function checkPassword(prevState: any, formData: FormData) {
    const password = formData.get('password')
    const budgetId = formData.get('budgetId')

    console.log("Passwrod es "+password)
    console.log("budgetId es "+budgetId)
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value
   
    if (!token) {
        return {
            errors: ['No autorizado'],
            success: ''
        }
    }

    try {
        const response = await fetch(`${process.env.API_URL}/auth/check-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ password:formData.get('password') })
        })

        const data = await response.json()
       
        if (!response.ok) {
            return {
                errors: [data.message || 'Error al verificar la contraseña'],
                success: ''
            }
        }

       
        const deleteResponse = await fetch(`${process.env.API_URL}/presupuesto/${budgetId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!deleteResponse.ok) {
            return {
                errors: ['Error al eliminar el presupuesto'],
                success: ''
            }
        }

        const result = {
            errors: [],
            success: 'Presupuesto eliminado correctamente'
        }

        revalidatePath('/admin')
        return result
    } catch (error) {
        return {
            errors: ['Error al procesar la solicitud'],
            success: ''
        }
    }
} 