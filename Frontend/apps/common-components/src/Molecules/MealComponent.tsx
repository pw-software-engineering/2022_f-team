import React from 'react'
import { MealModel } from '../models/MealModel'
import VeganMark from '../Atoms/VeganMark'
import StringListForMeal from '../Atoms/StringListForMeal'
import { LoadingComponent } from '../Atoms/LoadingComponent'

interface MealComponentProps {
  meal: MealModel | undefined
  closeModal: (res: any) => void
  setMealToDisplay: (res: any) => void
}

const MealComponent = (props: MealComponentProps) => {
  const closeModal = () => {
    props.closeModal(false)
    props.setMealToDisplay(undefined)
  }
  return (
    <div>
      <div className='shadowPanel' />
      <div className='meal-div'>
        <div className='meal-header-div'>
          {props.meal !== undefined && <h1>{props.meal.name}</h1>}
          {props.meal !== undefined && props.meal.vegan && <VeganMark />}
          <button onClick={() => closeModal()}>X</button>
        </div>
        {props.meal !== undefined && (
          <div className='mealLists'>
            <StringListForMeal
              title='Ingredients'
              list={props.meal.ingredientList}
            />
            <StringListForMeal
              title='Alergens'
              list={props.meal.allergenList}
            />
          </div>
        )}
        {props.meal !== undefined && (
          <div className='calories-div'>
            <p>Calories: {props.meal.calories} kcal</p>
          </div>
        )}
        {props.meal === undefined && <LoadingComponent />}
      </div>
    </div>
  )
}

export default MealComponent
