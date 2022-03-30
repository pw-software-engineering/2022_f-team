import React, { useState } from 'react'

interface FormInputComponentProps {
  label: string
  optional?: true
  type: string
  validationText: string
  validationFunc: (x: string) => boolean
  onValueChange: (x: string) => void
}

const FormInputComponent = (props: FormInputComponentProps) => {
  const [isValid, setIsValid] = useState<boolean>(true)

  const handleValueChange = (insertedValue: string) => {
    setIsValid(props.validationFunc(insertedValue));
    props.onValueChange(insertedValue)
  }

  return (
    <div className='formInputWrapper'>
      <label>
        {props.label}:{' '}
        {props.optional === undefined && <p className='requiredInput'>*</p>}
      </label>
      <input 
        type={props.type}
        onChange={(e) => handleValueChange(e.target.value)}
      />
      {!isValid && <p className='validationMessage'>{props.validationText}</p>}
    </div>
  )
}

export default FormInputComponent;
