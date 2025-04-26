"use server"

import { confirmTokenSchema } from "@/src/schemas/auth"

export async function ValidateToken(token:string) {
    console.log('desde el form token enviado' +token)
    const validateToken = confirmTokenSchema.safeParse(token)
   
    const url = `${process.env.API_URL}/auth/validate-token`
    const req = await fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            token:token
        })
    })
    const json = await req.json()

    if(!req.ok){
        return {
            success:false,
            data:json
         }
    }

    return {
       success:true,
       data:json
    }
  

}