"use client"

import { useRouter } from "next/navigation"

export default function AñadirGastoBoton() {
    const router = useRouter()

    return (
        <button
            type="button"
            className="bg-amber-500 hover:bg-amber-600 p-3 text-white uppercase font-bold cursor-pointer transition-colors"
            onClick={() => router.push('?addexpense=true&showModal=true')}
        >
            Añadir Gasto
        </button>
    )
}