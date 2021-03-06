import React, { useState } from 'react'

interface FormInputComponentProps {
  label: string
  name?: string
  optional?: true
  type: string
  validationText: string
  value?: string
  validationFunc: (x: string) => boolean
  onValueChange: (label: string, value: string) => void
}

const FormInputComponent = (props: FormInputComponentProps) => {
  const [isValid, setIsValid] = useState<boolean>(true)

  const handleValueChange = (insertedValue: string) => {
    const { onValueChange, validationFunc } = props
    setIsValid(validationFunc(insertedValue))
    onValueChange(createAriaLabel(), insertedValue)
  }

  const createAriaLabel = () => {
    const { label } = props
    if (label.includes(' ')) return label.substring(0, label.indexOf(' '))
    return label
  }

  return (
    <div className='formInputWrapper'>
      <label id={createAriaLabel()}>
        {props.name == null ? props.label : props.name}:{' '}
        {props.optional === undefined && <p className='requiredInput'>*</p>}
      </label>
      <input
        aria-labelledby={createAriaLabel()}
        type={props.type}
        value={props.value}
        onChange={(e) => handleValueChange(e.target.value)}
      />
      {!isValid && <p className='validationMessage'>{props.validationText}</p>}
    </div>
  )
}

export default FormInputComponent
