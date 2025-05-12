"use client"
import { ValidateToken } from "@/actions/validate-token";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { toast } from "react-toastify";

interface ValidateTokenFormProps {
    onValidToken: () => void;
    tokenValid: string;
    setTokenValid: (value: string) => void;
}

export default function ValidateTokenForm({ onValidToken, setTokenValid}: ValidateTokenFormProps) {
    const [token, setToken] = useState("")

    const handleChange = async (token: string) => {
        console.log("Token actual:", token, "Longitud:", token.length)
        setToken(token)
        if(token.length === 6) {
            const result = await ValidateToken(token)
            console.log("result:", result)
            
            if(!result.success){
                toast.warning(result.data.error)
            } else {
                toast.success(result.data.message)
                onValidToken();
                setTokenValid(token);
            }
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center gap-5 my-10">
                <PinInput
                    value={token}
                    onChange={handleChange}
                    type="number"
                >
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                </PinInput>
            </div>
        </div>
    )
}