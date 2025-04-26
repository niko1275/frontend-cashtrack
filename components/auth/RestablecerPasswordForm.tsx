"use client"
import { restablecerPassword } from "@/actions/restablecer-password-action";
import { useFormState } from "react-dom";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";

export default function ForgotPasswordForm() {
    const [state, dispatch] = useFormState(restablecerPassword,{
        errors:[],
        success:''
    })
    return (
        <form 
            className=" mt-14 space-y-5"
            noValidate
            action={dispatch}
        >
            {
                state.errors.map(e=><ErrorMessage children={e}/>)
            }
            {
                (state.success && <SuccessMessage children={state.success}/>)
            }
            <div className="flex flex-col gap-2 mb-10">
                <label
                className="font-bold text-2xl"
                >Email</label>
        
                <input
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                />
            </div>
        
            <input 
                type="submit"
                value='Enviar Instrucciones'
                className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
            />
        </form>
    )
}