
export interface DietModel {
  id: string
  name: string
  description?: string
  calories: number
  price: number
  vegan: boolean
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