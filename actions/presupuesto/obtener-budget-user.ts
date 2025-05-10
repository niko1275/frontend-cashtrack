"use server"

import { cookies } from "next/headers"

type Gasto = {
    id: number;
    nombre: string;
    cantidad: string;
  };
  
  type Presupuesto = {
    id: number;
    nombre: string;
    cantidad: string;
    userId: number;
    gastos: Gasto[]; 
  };

export default async function obtenerPresupuestoUsuario(): Promise<Presupuesto[] | []> {
    const url = `${process.env.API_URL}/presupuesto`
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value

    if (!token) {
        return []
    }

    try {
        const req = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if (!req.ok) {
            return []
        }

        return await req.json()
    } catch (error) {
        console.error('Error fetching budgets:', error)
        return []
    }
}

export async function obtenerPresupuestoById(id: string): Promise<Presupuesto | null> {
    const url = `${process.env.API_URL}/presupuesto/${id}/Gastos`
    const cookieStore = await cookies()
    const token = cookieStore.get('CASHTRACKR_TOKEN')?.value

    if (!token) {
        return null
    }

    try {
        const req = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if (!req.ok) {
            return null
        }
        const json = await req.json()
       
        return json 
    } catch (error) {
        console.error('Error fetching budget:', error)
        return null
    }
}