"use server"

import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

type ActionStateType = {
    errors: string[],
    success: string
} 

export async function eliminarGasto(idGasto: string, idPresupuesto: string): Promise<ActionStateType> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('CASHTRACKR_TOKEN')?.value

        if (!token) {
            return {
                errors: ['No hay token de autenticación'],
                success: ''
            }
        }
        console.log("Id del gasto es eliminar "+idGasto)
        console.log("Id del presupuesto es eliminar "+idPresupuesto)
        const url = `${process.env.API_URL}/presupuesto/${idPresupuesto}/Gastos/${idGasto}`
        const req = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!req.ok) {
            const error = await req.json()
            return {
                errors: [error.message || 'Error al eliminar el gasto'],
                success: ''
            }
        }

        revalidatePath('/admin')
        revalidateTag('budgets')

        return {
            errors: [],
            success: 'Gasto eliminado correctamente'
        }
    } catch (error) {
        return {
            errors: ['Error al eliminar el gasto'],
            success: ''
        }
    }
}

