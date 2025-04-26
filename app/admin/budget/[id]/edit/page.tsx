"use server"

import CreateBudgetForm from "@/components/auth/BudgetForm"
import { cookies } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"

const getBudget = async (id:String) => {
    console.log("Id es "+id)
    const url = `${process.env.API_URL}/presupuesto/${id}`
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value
    console.log("tOKEN VALOR"+token)
    const req =  await fetch(url,{
        method:'GET',
        headers:{
            'Authorization' : `Bearer ${token}`
        },
      
    })

    const json = await req.json()
    if(!req.ok){
        notFound()
    }
    return

}


export default async function Page({ params, }: { params: Promise<{id:string}> }) {
    const id = (await params).id
    

    await getBudget(id)
    return (
        <>
        <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
          <div className='w-full md:w-auto'>
            <h1 className='font-black text-4xl text-purple-950 my-5'>
              Editar Presupuesto: 
            </h1>
            <p className="text-xl font-bold">Llena el formulario y crea un nuevo {''}
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
        <div className='p-10 mt-10  shadow-lg border '>
            <CreateBudgetForm/>
        </div>
      </>
     
    );
  }
  