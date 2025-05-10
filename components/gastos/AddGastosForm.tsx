"use client"
import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./GastosForm";
import { useParams } from "next/navigation";
export default function AddGastosForm(){
    const {id} = useParams()
    
    return (
        <>
          <DialogTitle
            as="h3"
            className="font-black text-4xl text-purple-950 my-5"
          >
            Agregar Gasto
          </DialogTitle>
    
          <p className="text-xl font-bold">Llena el formulario y crea un {''}
            <span className="text-amber-500">gasto</span>
          </p>
     
          <ExpenseForm/>
        </>
      )
}