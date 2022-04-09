import React from 'react'
import { MealModel } from '../models/MealModel'

interface MealRowProps {
  meal: MealModel
  setMealToOpenInModal: (res: any) => void
}

const MealRow = (props: MealRowProps) => {
  return (
    <button
      className='meal-row'
      onClick={() => props.setMealToOpenInModal(props.meal)}
    >
      <p>{props.meal.name}</p>
      <p>Calories: {props.meal.calories} kcal</p>
    </button>
  )
}

export default MealRow