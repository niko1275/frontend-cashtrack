
import type { Metadata } from "next"
import RegisterForm from "@/components/auth/RegisterForm"
import ForgotPasswordForm from "@/components/auth/RestablecerPasswordForm"
import Link from "next/link"

export const metadata: Metadata = {
    title:"Cashtrackr - olvide mi contraseña",
    description:"Cashtrackr - olvide mi contraseña"
}

export default function RegisterPage (){
    return(
        <>
            <h1 className="font-black text-6xl text-purple-950 w-full"> ¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">Aqui puedes <span className="text-amber-500">Recuperarla</span></p>
            <ForgotPasswordForm/>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link href='/auth/login' className="text-center text-gray-500">
                    ¿ya tiene cuenta? Iniciar sesión
                </Link>

                <Link href='/auth/register' className="text-center text-gray-500">
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    )

}