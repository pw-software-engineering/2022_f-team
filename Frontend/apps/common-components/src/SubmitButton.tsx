import React from 'react'

interface SubmitButtonProps {
  validateForm: () => boolean
  action: (e:any) => void
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button
            disabled={!props.validateForm()}
            onClick={(e: any) => props.action(e)}
          >
            Register
          </button>
  )
}

export default SubmitButton
