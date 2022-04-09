import React from 'react'
import { MealModel } from '../models/MealModel'
import VeganMark from '../Atoms/VeganMark'

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
          <div>
            <h2>Ingredients</h2>
            <ul>
              {props.meal.ingredientList.map((ingredient: string) => (
                <li>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Allergens</h2>
            <ul>
              {props.meal.allergenList.map((allergen: string) => (
                <li>{allergen}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='calories-div'>
          <p>Calories: {props.meal.calories} kcal</p>
        </div>
      </div>
    </div>
  )
}

export default MealComponent
