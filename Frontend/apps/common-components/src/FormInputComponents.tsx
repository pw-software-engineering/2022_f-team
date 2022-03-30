import React from 'react'

interface FormInputComponentProps {
  label: string
  optional?: true
  type: string
  validationText: string
  validationFunc: (x: string) => boolean
  onValueChange: (x: string) => void
}

interface FormInputComponentState {
  isValid: boolean
}

class FormInputComponent extends React.Component<
  FormInputComponentProps,
  FormInputComponentState
> {
  constructor(props: FormInputComponentProps) {
    super(props)
    this.state = {
      isValid: true
    }
  }

  setIsValid(isValid: boolean) {
    this.setState({
      isValid: isValid
    })
  }

  handleValueChange = (insertedValue: string) => {
    const { validationFunc, onValueChange } = this.props
    this.setIsValid(validationFunc(insertedValue))
    onValueChange(insertedValue)
  }

  render() {
    const { label, optional, validationText, type } = this.props
    const { isValid } = this.state

    return (
      <div className='formInputWrapper'>
        <label>
          {label}:{' '}
          {optional === undefined && <p className='requiredInput'>*</p>}
        </label>
        <input
          type={type}
          onChange={(e) => this.handleValueChange(e.target.value)}
        />
        {!isValid && <p className='validationMessage'>{validationText}</p>}
      </div>
    )
  }
}
export default FormInputComponent
