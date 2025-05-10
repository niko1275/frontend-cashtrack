"use server"

import { DraftGastoSchema } from '@/src/schemas'
import { confirmTokenSchema } from '@/src/schemas/auth'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'

type ActionStateType = {
    errors: string[],
    success:string

} 

export async function actualizarGasto(idgasto:string,idpresupuesto:string,prevState: ActionStateType, formData: FormData) {
    
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value
    console.log("Id del gasto es actualizar "+idgasto)
    const budget = DraftGastoSchema.safeParse({
        nombre: formData.get('nombre'),
        cantidad: formData.get('cantidad')
    })

        const url = `${process.env.API_URL}/presupuesto/${idgasto}/Gastos/${idpresupuesto}`
        const req = await fetch(url,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                 'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
            nombre:budget.data?.nombre,
            cantidad:budget.data?.cantidad
            })
        })

        const json = await req.json()

        console.log("jSON ERROR "+ JSON.stringify(json))
        if (!req.ok) {
            return {
                errors: [json],
                success:''
            }
        }

        revalidatePath('/admin')
        revalidateTag('budgets')

        return {
            errors: [],
            success:json as string
        }
  
}

