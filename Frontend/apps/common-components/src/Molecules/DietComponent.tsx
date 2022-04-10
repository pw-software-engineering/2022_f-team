import React from 'react'
import { useState } from 'react'
import ExpandMoreButton from '../Atoms/ExpandMoreButton'
import MealComponent from './MealComponent'
import { DietModel } from '../models/DietModel'
import { MealModel } from '../models/MealModel'
import VeganMark from '../Atoms/VeganMark'
import MealRow from '../Atoms/MealRow'

interface DietComponentProps {
  diet: DietModel
}

const DietComponent = (props: DietComponentProps) => {
  const [mealToOpenInModal, setMealToOpenInModal] = useState<
    MealModel | undefined
  >(undefined)
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
        <p>Price: {props.diet.price}</p>
        <button className='addToCartButton'>Add to cart</button>
      </div>
      <ExpandMoreButton onClick={toogleShowMeals} />
      {showMeals && (
        <div className='mealsDiv'>
          <h2>Meals:</h2>
          {props.diet.meals.map((meal: MealModel) => (
            <MealRow meal={meal} setMealToOpenInModal={setMealToOpenInModal} />
          ))}
          {mealToOpenInModal !== undefined && (
            <MealComponent
              meal={mealToOpenInModal}
              closeModal={setMealToOpenInModal}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default DietComponent
