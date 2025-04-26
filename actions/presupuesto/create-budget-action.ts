"use server"
import { DraftBudgetSchema } from "@/src/schemas"
import { cookies } from "next/headers";

type ActionStateType = {
    errors: string[];
    success: string;
}

export default async function crearPresupuesto(prevState: ActionStateType, formData: FormData){
    const budget = DraftBudgetSchema.safeParse({
        nombre: formData.get('nombre'),
        cantidad: formData.get('cantidad')
    })
    
    if (!budget.success) {
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value
    console.log('token es '+JSON.stringify(token))
    const url = `${process.env.API_URL}/presupuesto`
    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body:JSON.stringify({
        nombre:budget.data.nombre,
        cantidad:budget.data.cantidad
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
        success: json.message
    }
}