import React from 'react'

interface SubmitButtonProps {
  text: string
  validateForm: () => boolean
  action: (e:any) => void
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button
            disabled={!props.validateForm()}
            onClick={(e: any) => props.action(e)}
          >
            {props.text}
          </button>
  )
}

export default SubmitButton
