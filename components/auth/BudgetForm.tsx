"use client"

import crearPresupuesto from "@/actions/presupuesto/create-budget-action"
import updateBudgetAction from "@/actions/presupuesto/update-budget-action"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";
import { toast } from "react-toastify";
import SuccessMessage from "../ui/SuccessMessage";

type ActionStateType = {
    errors: string[];
    success: string;
}

interface BudgetFormProps {
    initialData?: {
        id?: string;
        nombre: string;
        cantidad: number;
    };
}

export default function CreateBudgetForm({ initialData }: BudgetFormProps) {
  const [state,formAction] = useFormState(
    initialData ? (prevState: ActionStateType, formData: FormData) => updateBudgetAction(prevState, formData, initialData.id!) : crearPresupuesto, 
    {
      errors: [],
      success: ''
    }
  )

  useEffect(()=>{
    if(state.success){
        toast.success(state.success)
    }
    if(state.errors.length > 0) {
        state.errors.forEach(error => toast.error(error))
    }
  },[state])
  
  return (
    <form
      className="mt-10 space-y-3"
      noValidate
      action={formAction}
    >
        {state.errors.length > 0 && (
            <div className="space-y-2">
                {state.errors.map((error, index) => (
                    <ErrorMessage key={index} children={error}/>
                ))}
            </div>
        )}

        {state.success && (
            <SuccessMessage children={state.success}/>
        )}
          
      <div className="space-y-3">
          <label htmlFor="name" className="text-sm uppercase font-bold">
              Nombre Presupuesto
          </label>
          <input
              id="nombre"
              className="w-full p-3  border border-gray-100 bg-slate-100"
              type="text"
              placeholder="Nombre del Presupuesto"
              name="nombre"
              defaultValue={initialData?.nombre}
          />
      </div>
      <div className="space-y-3">
          <label htmlFor="amount" className="text-sm uppercase font-bold">
              Cantidad Presupuesto
          </label>
          <input
              type="number"
              id="amount"
              className="w-full p-3  border border-gray-100 bg-slate-100"
              placeholder="Cantidad Presupuesto"
              name="cantidad"
              defaultValue={initialData?.cantidad}
          />
      </div>
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value={initialData ? 'Actualizar Presupuesto' : 'Crear Presupuesto'}
      />
    </form>
  )
}