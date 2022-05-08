export const EmailValidator = (value: string) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  return value.length > 0 && regex.test(value)
}

export const PhoneValidator = (value: string) => {
  const regex = /^\+?[0-9]{9,12}$/i
  return value.replace(' ', '').length > 6 && regex.test(value.replace(' ', ''))
}

export const PostalCodeValidator = (value: string) => {
  const regex = /^[0-9]{2}-[0-9]{3}$/i
  return regex.test(value)
}

export const findDayDifference = (
  value1: string,
  value2: string = new Date().toString()
) => {
  if (value2.length == 0) return 0
  const date1 = new Date(value1)
  const date2 = new Date(value2)
  return Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))
}
