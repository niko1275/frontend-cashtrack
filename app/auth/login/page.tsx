
import type { Metadata } from "next"
import RegisterForm from "@/components/auth/RegisterForm"
import LoginForm from "@/components/auth/LoginForm"
import Link from "next/link"
import { login } from "@/actions/login-acount"
import { useFormState } from "react-dom"

export const metadata: Metadata = {
    title:"Cashtrackr - Iniciar Sesión",
    description:"Cashtrackr - Iniciar Sesión"
}

export default function LoginPage (){
  
    return(
        <>
            <h1 className="font-black text-6xl text-purple-950"> Iniciar Sesión</h1>
            <p className="text-3xl font-bold">Y controla tus <span className="text-amber-500">finanzas</span></p>
            <LoginForm/>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link href='/auth/register' className="text-center text-gray-500">
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    )

}