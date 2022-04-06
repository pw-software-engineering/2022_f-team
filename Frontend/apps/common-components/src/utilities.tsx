export const EmailValidator = (value: string) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  return value.length > 0 && regex.test(value)
}

export const PasswordValidator = (value: string) => {
  return value.length > 0;
}

export const PhoneValidator = (value: string) => {
  const regex = /^\+?[0-9]{9,12}$/i
  return value.replace(' ', '').length > 6 && regex.test(value.replace(' ', ''))
}

export const PostalCodeValidator = (value: string) => {
  const regex = /^[0-9]{2}-[0-9]{3}$/i
  return regex.test(value)
}
