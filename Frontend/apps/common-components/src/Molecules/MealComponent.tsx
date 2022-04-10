import React from 'react'
import { MealModel } from '../models/MealModel'
import VeganMark from '../Atoms/VeganMark'
import StringListForMeal from '../Atoms/StringListForMeal'

interface MealComponentProps {
  meal: MealModel
  closeModal: (res: any) => void
}

const MealComponent = (props: MealComponentProps) => {
  return (
    <div>
      <div className='shadowPanel' />
      <div className='meal-div'>
        <div className='meal-header-div'>
          <h1>{props.meal.name}</h1>
          {props.meal.vegan && <VeganMark />}
          <button onClick={() => props.closeModal(undefined)}>X</button>
        </div>
        <div className='mealLists'>
          <StringListForMeal
            title='Ingredients'
            list={props.meal.ingredientList}
          />
          <StringListForMeal title='Alergens' list={props.meal.allergenList} />
        </div>
        <div className='calories-div'>
          <p>Calories: {props.meal.calories} kcal</p>
        </div>
      </div>
    </div>
  )
}

export default MealComponent
