import React from 'react'
import FormInputComponent from './FormInputComponents'
import SubmitButton from './SubmitButton'
import { EmailValidator } from './utilities'

interface LoginFormProps {
  onSubmitClick: () => void
  bottom?: React.ReactNode
  onValueChange: (label: string, value: string) => void
  validateForm: () => boolean
}

const LoginForm = (props: LoginFormProps) => {
  const handleLogin = (e: any) => {
    e.preventDefault()

    props.onSubmitClick()
  }

  return (
    <form>
      <h1>Login</h1>
      <div className='normal-input-wrapper'>
        <FormInputComponent
          label='Email'
          onValueChange={props.onValueChange}
          type='email'
          validationText='Provide valid email format.'
          validationFunc={(x: string) => EmailValidator(x)}
        />
        <FormInputComponent
          label='Password'
          onValueChange={props.onValueChange}
          type='password'
          validationText='Provide account password.'
          validationFunc={(x: string) => x.length >= 8}
        />
      </div>
      <div className='button-div'>
        <SubmitButton
          action={handleLogin}
          validateForm={props.validateForm}
          text='Login'
        />
        {props.bottom}
      </div>
    </form>
  )
}

export default LoginForm
