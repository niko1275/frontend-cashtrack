"use server"

import { confirmTokenSchema, ResetPasswordSchema } from "@/src/schemas/auth";

type ActionStateType = {
    errors: string[];
    success: string;
  };

export default async function newPassword(
    token: string,
    prevState: ActionStateType,
    formData: FormData
  ) {
    const password = formData.get("password") as string;
    const password_confirmation = formData.get("password_confirmation") as string;
    const passwordSchema = ResetPasswordSchema.safeParse({
        password,
        password_confirmation
      });

      console.log(passwordSchema)
    if(!passwordSchema.success){
        return {

            errors: passwordSchema.error?.issues.map(e=>e.message),
        
            success:''
        }
    }
  
    const url = `${process.env.API_URL}/auth/reset-password/${token}`
    console.log(url)
    const req = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            password:passwordSchema.data.password
        })
    })
    const json = await req.json()
    console.log(json)
    if (!req.ok) {
        return {
          errors: [json.error],
          success: ''
        }
      }
      
    return {
        errors: [],
        success:json as string
    }
  }