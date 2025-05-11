"use client"

import { login } from "@/actions/login-acount"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";

export default function LoginForm() {
    const router = useRouter()
    const [state,dispatch] = useFormState(login,{
        errors:[],
        success:''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        dispatch(formData);
    };

    useEffect(()=>{
        if(state.success){
            router.push('/admin')
        }
    },[state, router])

    return (
        <>
            {state.errors.map((error, index) => (
                <ErrorMessage key={index}>{error}</ErrorMessage>
            ))}
        
            <form
                className="mt-14 space-y-5"
                noValidate
                action={dispatch}
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="email"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full border border-gray-300 p-3 rounded-lg"
                        name="password"
                    />
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer"
                />
            </form>
        </>
    )
}