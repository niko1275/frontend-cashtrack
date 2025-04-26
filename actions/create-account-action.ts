"use server"

import { registerSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success:string

} 

export async function register(prevState:ActionStateType,formData: FormData){

    const registerData = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    const register = registerSchema.safeParse(registerData)

  

    if (!register.success) {
        const errors = register.error?.issues.map(e=>e.message)

        return {
            errors,
            success:prevState.success
        }
    }

    const url = `${process.env.API_URL}/auth/create-account`
    const req = await fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
        nombre: register.data?.nombre,
        email: register.data?.email,
        password: register.data?.password,
        password_confirmation: register.data?.password_confirmation
        })
    })
        
    const json = await req.json()
    
    if (!req.ok) {
        return {
          errors: [json.error],
          success: ''
        }
      }
      

    const success = SuccessSchema.parse(json)
    console.log(success)

    return {
        errors: [],
        success:json as string
    }
}