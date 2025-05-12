import { ConfirmarCuenta } from '@/components/auth/ConfirmarCuenta'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title:"Cashtrackr - Confirmar Cuenta",
    description:"Cashtrackr - Confirmar Cuenta"
}


export default function page() {
   
  return (
    <>
        <h1 className='font-bold text-6xl text-purple-950'>Confirma tu cuenta</h1>
        <p className='text-3xl font-bold'>Ingresa el codigo que recibiste
        <span className='text-amber-500'> Por emal</span></p> 
        <ConfirmarCuenta/>
    </>
  )
}
