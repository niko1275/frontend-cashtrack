"use server"

import { cookies } from "next/headers"

type Presupuesto = {
    id: number;
    nombre: string;
    cantidad: string;
    userId: number;
  }
  

export default async function obtenerPresupuestoUsuario(): Promise<Presupuesto[] | []> {
    const url = `${process.env.API_URL}/presupuesto`
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value
    const req = await fetch(url,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${token}`
        },
      
    })
    const json = await req.json()
    if (!req.ok) {
        console.error("Error al obtener presupuestos", await req.text())
        return [] 
      }
    return json as Presupuesto[]
  
}