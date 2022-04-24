export interface MealModel {
  mealId: string
  name: string
  ingredientList: string[]
  allergenList: string[]
  calories: number
  vegan: boolean
}

export interface MealShort{
  id:string
  name: string
  calories: number
  isVegan: boolean
}