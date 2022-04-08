import React from 'react'
import { useState } from 'react'
import ExpandMoreButton from './ExpandMoreButton'
import { DietModel } from './models/DietModel'
import { MealModel } from './models/MealModel'
import VeganMark from './VeganMark'

interface DietComponentProps {
  diet: DietModel
}

const DietComponent = (props: DietComponentProps) => {
  const [showMeals, setShowMeals] = useState<boolean>(false)
  const toogleShowMeals = (): void => setShowMeals(!showMeals)

  return (
    <div className='diet-div'>
      <div className='diet-header-div'>
        <h1>{props.diet.title}</h1>
        {props.diet.vegan && <VeganMark />}
      </div>
      <p className='description'>{props.diet.description}</p>
      <div className='calories-price-div'>
        <p>Calories: {props.diet.calories} kcal</p>
        <p>Price: xxx</p>
        <button className='addToCartButton'>Add to cart</button>
      </div>
      <ExpandMoreButton onClick={toogleShowMeals} />
      {showMeals && (
        <div className='mealsDiv'>
          <h2>Meals:</h2>
          {props.diet.meals.map((meal: MealModel) => (
            <div className='meal-row'>
              <p>{meal.name}</p>
              <p>Calories: {meal.calories} kcal</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DietComponent
