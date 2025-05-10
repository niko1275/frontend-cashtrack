"use server"

import CreateBudgetForm from "@/components/auth/BudgetForm"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"

const getBudget = async (id: string) => {
    try {
        const url = `${process.env.API_URL}/presupuesto/${id}`
        const cookieStore = await cookies()
        const token = cookieStore.get('CASHTRACKR_TOKEN')?.value
        
        if (!token) {
            notFound()
        }

        const req = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if (!req.ok) {
            notFound()
        }

        return await req.json()
    } catch (error) {
        console.error('Error fetching budget:', error)
        notFound()
    }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const budget = await getBudget(id)
    
    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className='font-black text-4xl text-purple-950 my-5'>
                        Editar Presupuesto: {budget.nombre}
                    </h1>
                    <p className="text-xl font-bold">Modifica los datos del {''}
                        <span className="text-amber-500">presupuesto</span>
                    </p>
                </div>
                <Link 
                    href={'/admin'}
                    className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Volver
                </Link>
            </div>
            <div className='p-10 mt-10 shadow-lg border'>
                <CreateBudgetForm initialData={budget} />
            </div>
        </>
    );
}
  