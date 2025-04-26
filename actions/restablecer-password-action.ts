"use server"

import { ForgotPasswordSchema } from "@/src/schemas/auth"
import { error } from "console"

type ActionStateType = {
    errors: string[],
    success:string

} 
export async function restablecerPassword(prevState:ActionStateType,formData:FormData){

    const dataform = {
        email: formData.get('email')
      }

   const result = ForgotPasswordSchema.safeParse(dataform)

   if(!result.success){
        const errors = result.error.issues.map(e=>e.message)
        return {
            errors,
            success:''
        }
   }

    const url = `${process.env.API_URL}/auth/restablecer-password`
    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:result.data?.email,
            
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
        errors:[],
        success:json as string
    }
}