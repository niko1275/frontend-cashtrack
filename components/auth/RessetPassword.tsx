"use client"
import newPassword from "@/actions/new-password-action"
import { stat } from "fs";
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";
import { useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
export default  function ResetPasswordForm({token}:{token:string}) {
  const router =useRouter()
  const [state, dispatch] = useFormState(
    newPassword.bind(null, token),
    {
      errors: [],
      success: ''
    }

    
  )

  useEffect(()=>{

    if(state.success){
      toast.success(state.success,{
        onClose: ()=>{
          router.push('/auth/login')
        }
      })
    }
   },[state])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    dispatch(formData);
  };
    return (

      
      <form
        className=" mt-14 space-y-5"
        noValidate
        action={dispatch}
        onSubmit={handleSubmit}
      >

    {state.errors.map(e=><ErrorMessage children={e}/>)}
    {state.success && <SuccessMessage children={state.success}/>}
        <div className="flex flex-col gap-5">
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
  
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
          >Repetir Password</label>
  
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password_confirmation"
          />
  
        </div>
  
        <input
          type="submit"
          value='Guardar Password'
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
        />
      </form>
    )
  }