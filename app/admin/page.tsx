import obtenerPresupuestoUsuario from '@/actions/presupuesto/obtener-budget-user'
import BudgetMenu from '@/components/presupuesto/BudgetMenu'
import { verifySesion } from '@/src/auth/dal'
import Link from 'next/link'
import React from 'react'

export default async function page() {
  
  const presupuestos = await obtenerPresupuestoUsuario()
  console.log("es "+JSON.stringify(presupuestos))
  return (
    <>
  
    <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
    <div className='w-full md:w-auto'>
        <h1 className="font-black text-4xl text-purple-950 my-5">Mis Presupuestos</h1>
        <p className="text-xl font-bold">Maneja y administra tus {''}
        <span className="text-amber-500">presupuestos</span>
        </p>
    </div>
    <Link
        href={'/admin/budget/new'}
        className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
    >
        Crear Presupuesto
    </Link>
    </div>

    <div>
    <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-10 ">
        {presupuestos.map((budget) => (
          <li key={budget.id} className="flex justify-between gap-x-6 p-5 ">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto space-y-2">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <Link href={`/admin/budget/${budget.id}/edit`}>
                  {budget.nombre}
                  </Link>
                  
                </p>
                <p className="text-xl font-bold text-amber-500">
                {new Intl.NumberFormat('es-CL', {
                  style: 'currency',
                  currency: 'CLP',
                  minimumFractionDigits: 0,
                }).format(Number(budget.cantidad))}
                </p>
               
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
              <BudgetMenu/>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>

     )
}
