const apiUrl = 'https://localhost:5001/api'

export const getRegisterClientURL = (): string => apiUrl + '/Client/register'

export const getLoginClientURL = (): string => apiUrl + '/Client/login'

export const getDietsURL = (): string => apiUrl + '/Diets'

export const getMealsURL = (): string => apiUrl + '/Meals'

export const getDietDetailsURL = (dietId: string): string =>
  apiUrl + '/Diets/' + dietId

export const putDietDetailsURL = (dietId: string): string =>
  apiUrl + '/Diets/' + dietId

export const getMealDetailsURL = (mealId: string): string =>
  apiUrl + '/Meals/' + mealId

export const putMealDetailsURL = (mealId: string): string =>
  apiUrl + '/Meals/' + mealId

export const getClientProfileURL = (): string => apiUrl + '/Client/account'
