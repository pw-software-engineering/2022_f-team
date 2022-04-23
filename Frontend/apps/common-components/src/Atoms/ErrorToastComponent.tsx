import React, { Dispatch, SetStateAction } from 'react'

interface ErrorToastComponentProps {
  message: string
  closeToast: Dispatch<SetStateAction<boolean>>
}

export const ErrorToastComponent = (props: ErrorToastComponentProps) => {
  return (
    <div className='errorDiv'>
      <h1>Error</h1>
      <button onClick={() => props.closeToast(false)}>X</button>
      <p>{props.message}</p>
    </div>
  )
}
