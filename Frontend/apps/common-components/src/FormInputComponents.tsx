import * as React from 'react'
import { useState } from 'react'

interface FormInputComponentProps {
  label: string
  optional?: true
  type: string
  validationText: string
  validationFunc: (x: string) => boolean
  onValueChange: (x: string) => void
}

export const FormInputComponent = (props: FormInputComponentProps) => {
  const [value, setValue] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(true)

  const Validate = () => {
    const isCorrect = props.validationFunc(value)
    setIsValid(isCorrect)
    return isCorrect
  }

  const handleValueChange = (insertedValue: string) => {
    setValue(insertedValue)
    Validate()
    props.onValueChange(insertedValue)
  }
  return (
    <div>
      <label>
        {props.label}:{' '}
        {props.optional === undefined && <p className='requiredInput'>*</p>}
      </label>
      <input
        type={props.type}
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
      />
      {!isValid && <p className='validationMessage'>{props.validationText}</p>}
    </div>
  )
}

