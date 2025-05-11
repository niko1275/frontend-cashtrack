"use client"

import crearPresupuesto from "@/actions/presupuesto/create-budget-action"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";
import { toast } from "react-toastify";
import SuccessMessage from "../ui/SuccessMessage";

export default function CreateBudgetForm() {
  const [state,dispatch] = useFormState(crearPresupuesto, {
    errors: [],
    success: ''
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    dispatch(formData);
  };

  useEffect(()=>{
    if(state.success){
        toast.done(state.success)
    }
  },[state])
  
  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={dispatch}
      onSubmit={handleSubmit}
    >
        {state.errors.map((error, index) => (
            <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}

        {state.success && (
            <SuccessMessage>{state.success}</SuccessMessage>
        )}
          
        <CreateBudgetForm/>
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Crear Presupuesto'
        />
    </form>
  )
}