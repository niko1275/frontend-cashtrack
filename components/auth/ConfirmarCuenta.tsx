"use client"

import { confirm } from '@/actions/confirm-account-action'
import { PinInput,PinInputField } from '@chakra-ui/pin-input'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

export const ConfirmarCuenta = () => {
     const [token,setToken] = useState("")
     const [isComplete,setIsComplete] = useState(false)
     
     const [state,formAction] = useFormState(confirm,{
        errors:[],
        success:''
     })

     const handleToken = (token:string) => {
        setToken(token)
        if(token.length === 6) {
            setIsComplete(true)
        } else {
            setIsComplete(false)
        }
     }
     const router = useRouter()
     
     useEffect(()=>{

      if(state.errors.length>0){
        state.errors.forEach((error) => (
          toast.warning(error)
      ))
      }

      if(state.success){
        toast.success(state.success,{
          onClose: ()=>{
            router.push('/auth/login')
          }
        })
      }
     },[state])

  return (
    <form action={formAction} className='flex flex-col items-center'>
        <input type="hidden" name="token" value={token} />
        <div className='flex justify-center gap-5 my-10'>
            <PinInput value={token} onChange={handleToken}>
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white' />
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white'/>
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white'/>
                <PinInputField className='h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white'/>
            </PinInput>
        </div>
        
        {state.errors.length > 0 && (
            <div className="mb-4">
                {state.errors.map((error, index) => (
                    <p key={index} className="text-red-500 text-sm">{error}</p>
                ))}
            </div>
        )}
      {
        state.success && (
          <div>
            <p>{state.success}</p>
          </div>
        )
      }
        {isComplete && (
            <button 
                type="submit"
                className="bg-purple-950 hover:bg-purple-800 px-6 py-2 rounded-lg text-white font-bold"
            >
                Confirmar Código
            </button>
        )}
    </form>
  )
}
