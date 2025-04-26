"use client"
import React, { useState } from 'react'
import ValidateTokenForm from './ValidateTokenForm'
import ResetPasswordForm from './RessetPassword'
import { ValidateToken } from '@/actions/validate-token'

export default function PasswordResetHandler() {
    const [isValidToken,setIsValidToken] = useState(false)
    const [tokenValid,setTokenValid] = useState('')
    
    const handleValidToken = () => {
        setIsValidToken(true)
    }

   

  return (
    <>
        {
            (!isValidToken ? 
                <ValidateTokenForm onValidToken={handleValidToken} tokenValid={tokenValid} setTokenValid={setTokenValid} /> : 
                <ResetPasswordForm token={tokenValid} />
            )
        }

        <div>{tokenValid}</div>
    </>
  )
}
