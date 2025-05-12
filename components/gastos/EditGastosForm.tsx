"use client"
import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./GastosForm";


export default function EditGastosForm() {
    
   
    return (
        <>
          <DialogTitle
            as="h3"
            className="font-black text-4xl text-purple-950 my-5"
          >
            Editar Gasto
          </DialogTitle>
          <p className="text-xl font-bold">Edita los detalles de un {''}
            <span className="text-amber-500">gasto</span>
          </p>
         
            <ExpenseForm/>
        </>
    )
}