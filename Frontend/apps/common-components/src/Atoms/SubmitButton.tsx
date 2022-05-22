import React from 'react'

interface SubmitButtonProps {
  text: string
  validateForm: () => boolean
  action: (e: any) => void,
  style?: React.CSSProperties | undefined
}

const SubmitButton = (props: SubmitButtonProps) => {
  const disabled = !props.validateForm()

  return (
    <button
      disabled={disabled}
      onClick={(e: any) => props.action(e)}
      style={{
        height: '52px',
        padding: '1vh 2vw',
        fontSize: '2.0vh',
        border: 'solid 3px #539091',
        borderRadius: '15px',
        backgroundColor: disabled ? '#88acad' : '#539091',
        color: 'white',
        fontWeight: '600',
        marginBottom: '2vh',
        cursor: disabled ? 'default' : 'pointer',
        ...props.style,
      }}
    >
      {props.text}
    </button>
  )
}

export default SubmitButton
