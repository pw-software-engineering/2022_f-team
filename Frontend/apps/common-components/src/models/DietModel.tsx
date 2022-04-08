import { MealModel } from './MealModel'

export interface DietModel {
  dietId: string
  title: string
  description: string
  calories: number
  meals: MealModel[]
  vegan: boolean
}
