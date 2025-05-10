"use server"

import { DraftGastoSchema } from '@/src/schemas'
import { confirmTokenSchema } from '@/src/schemas/auth'
import { cookies } from 'next/headers'

type ActionStateType = {
    errors: string[],
    success:string

} 

export async function obtenergasto(idgasto:string,idpresupuesto:string) {
    
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value
  
   

        const url = `${process.env.API_URL}/presupuesto/${idpresupuesto}/Gastos/${idgasto}`
        const req = await fetch(url,{
            method: 'GET',
            headers:{
               
                 'Authorization': `Bearer ${token}`
            },
            
        })

        const json = await req.json()

       
        if (!req.ok) {
            return {
                errors: [json],
                success:''
            }
        }
        return {
            errors: [],
            success:json as string
        }
  
}

