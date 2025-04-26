//data access layer
import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { UserSchema } from "../schemas/auth"
import {cache} from 'react'

export const verifySesion = cache(async () =>{ 
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value
   
    console.log("tolen value "+token)
    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    const session = await req.json()
    const result = UserSchema.safeParse(session)
    console.log("Session "+JSON.stringify(session))
    console.log("result "+JSON.stringify(result))
    if(!result.success){
        redirect('/auth/login')
    }

    return {
        user:result.data,
        isAuth:true
    }
})