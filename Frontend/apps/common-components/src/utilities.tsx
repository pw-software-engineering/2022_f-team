export const EmailValidator = (value: string) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  return value.length > 0 && regex.test(value)
}
export const PhoneValidator = (value: string) => {
  const regex = /^\+?[0-9]{9,12}$/i
  return (
    value.replaceAll(' ', '').length > 6 &&
    regex.test(value.replaceAll(' ', ''))
  )
}
