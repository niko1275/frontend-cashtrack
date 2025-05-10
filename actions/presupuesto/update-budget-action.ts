"use server"

import { DraftBudgetSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath, revalidateTag } from "next/cache"

export default async function updateBudgetAction(prevState: any, formData: FormData, budgetId: string) {
    const url = `${process.env.API_URL}/presupuesto/${budgetId}`
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value

    const budget = DraftBudgetSchema.safeParse({
        nombre: formData.get('nombre'),
        cantidad: formData.get('cantidad')
    })

    if (!token) {
        return {
            errors: ['No autorizado'],
            success: ''
        }
    }

    try {
        const req = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
                id:budgetId,
                nombre:budget.data?.nombre,
                cantidad:budget.data?.cantidad
                })
        })

        const json = await req.json()

        if (!req.ok) {
            return {
                errors: [json.message || 'Error al actualizar el presupuesto'],
                success: ''
            }
        }

        // Revalidar la data
        revalidatePath('/admin')
        revalidateTag('budgets')

        return {
            errors: [],
            success: 'Presupuesto actualizado correctamente'
        }
    } catch (error) {
        return {
            errors: ['Error al actualizar el presupuesto'],
            success: ''
        }
    }
} 