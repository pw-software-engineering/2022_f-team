import { MealModel } from "./MealModel"

export interface DietModel {
  id: string
  name: string
  description?: string
  calories: number
  price: number
  vegan: boolean
}

export interface DietFullModel{
  dietId: string
  name: string
  description?: string
  price: number
  vegan: boolean
  meals: Array<MealModel>
}

export interface EditDietModel {
  id: string
  name: string
  mealIds: Array<string>
  price: number
}

export interface GetDietsQuery {
  Name: string
  Name_with: string
  Vegan?: boolean
  Calories?: number
  Calories_lt?: number
  Calories_ht?: number
  Price?: number
  Price_ht?: number
  Price_lt?: number
  Sort: string
  Offset?: number
  Limit?: number
}

export interface GetDietDetailsQuery {
  dietId: string
}

