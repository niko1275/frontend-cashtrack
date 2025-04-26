"use server"

import { SuccessSchema } from "@/src/schemas"
import { loginSchema } from "@/src/schemas/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type ActionStateType = {
    errors: string[],
    success:string

}  | undefined

export async function login(prevState:ActionStateType,formData: FormData){

    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    console.log(loginData)

    const login = loginSchema.safeParse(loginData)
   
    if(!login.success){
        return {

            errors: login.error?.errors.map(e=>e.message),
        
            success:''
        }
    }
    
    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:login.data?.email,
            password: login.data?.password
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

    const cookieStore = await cookies()
    cookieStore.set({
        name: 'CASHTRACKR_TOKEN',
        value: json,
        httpOnly: true,
        path: '/',
      })

      redirect
    return {
        errors: [],
        success:json as string
    }
}