"use client"

import { crearGasto } from "@/actions/gastos/crear-gasto-action";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";

import { actualizarGasto } from "@/actions/gastos/actualizar-gasto-action";

interface Expense {
    id: number;
    nombre: string;
    cantidad: number;
}

export default function ExpenseForm() {
    const {id} = useParams()
    const searchParams = useSearchParams()
    const idgasto = searchParams.get('IdGasto')
    const [expense, setExpense] = useState<Expense | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadExpense = async () => {
            if (idgasto) {
                setLoading(true)
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${id}/expenses/${idgasto}`)
                    if (response.ok) {
                        const data = await response.json()
                        setExpense(data)
                    }
                    console.log("RESPONSE "+JSON.stringify(response))
                } catch (error) {
                    console.error('Error loading expense:', error)
                    toast.error('Error al cargar el gasto')
                } finally {
                    setLoading(false)
                }
            }
        }

        loadExpense()
    }, [id, idgasto])

    const formActionFn = idgasto
    ? actualizarGasto.bind(null, id as string,idgasto as string)
    : crearGasto.bind(null, id as string);



    const [state, formAction] = useFormState(formActionFn, {
        errors: [],
        success: ''
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
        }
    }, [state])

    if (loading) {
        return <div className="text-center">Cargando...</div>
    }

    return (
        <form
            className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
            noValidate
            action={formAction}
        >
            {state.errors.length > 0 && (
                <div className="mb-4">
                    {state.errors.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                            {error.path}: {error.msg}
                        </p>
                    ))}
                </div>
            )}
            <div className="mb-5">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre Gasto
                </label>
                <input
                    id="nombre"
                    className="w-full p-3 border border-gray-100 bg-white"
                    type="text"
                    placeholder="Nombre del Gasto"
                    name="nombre"
                    defaultValue={expense?.nombre}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="amount" className="text-sm uppercase font-bold">
                    Cantidad Gasto
                </label>
                <input
                    id="cantidad"
                    className="w-full p-3 border border-gray-100 bg-white"
                    type="number"
                    placeholder="Cantidad Gasto"
                    name="cantidad"
                    defaultValue={expense?.cantidad}
                />
            </div>

            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value={idgasto ? "Actualizar Gasto" : "Crear Gasto"}
            />
        </form>
    )
}