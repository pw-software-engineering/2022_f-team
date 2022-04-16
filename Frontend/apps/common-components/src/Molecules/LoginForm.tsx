import React from 'react'
import FormInputComponent from '../Atoms/FormInputComponents'
import SubmitButton from '../Atoms/SubmitButton'

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
          validationFunc={(_: string) => true}
        />
        <FormInputComponent
          label='Password'
          onValueChange={props.onValueChange}
          type='password'
          validationText='Provide account password.'
          validationFunc={(_: string) => true}
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
