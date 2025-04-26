import React from 'react'

export const SuccessMessage = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='text-center my-4 bg-amber-400 text-white font-bold p-3 uppercase text-sm'>
      {children}
    </div>
  )
}

export default SuccessMessage
