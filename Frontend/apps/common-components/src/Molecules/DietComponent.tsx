import React from 'react'
import { useState } from 'react'
import ExpandMoreButton from '../Atoms/ExpandMoreButton'
import MealComponent from './MealComponent'
import { DietModel } from '../models/DietModel'
import { MealModel, MealShort } from '../models/MealModel'
import VeganMark from '../Atoms/VeganMark'
import MealRow from '../Atoms/MealRow'
import { LoadingComponent } from '../Atoms/LoadingComponent'

interface DietComponentProps {
  diet: DietModel
  addToCartFunction: (dietId: string) => void
  getMeals: (dietId: string) => void
  meals: Array<MealShort>
}

const DietComponent = (props: DietComponentProps) => {
  const [mealToOpenInModal, setMealToOpenInModal] = useState<
    MealModel | undefined
  >(undefined)
  const [showMeals, setShowMeals] = useState<boolean>(false)
  const toogleShowMeals = (): void => {
    if (props.meals.length === 0) {
      props.getMeals(props.diet.id)
    }
    setShowMeals(!showMeals)
  }

  return (
    <div className='diet-div'>
      <div className='diet-header-div'>
        <h1>{props.diet.name}</h1>
        {props.diet.vegan && <VeganMark />}
      </div>
      <p className='description'>{props.diet.description}</p>
      <div className='calories-price-div'>
        <p>Calories: {props.diet.calories} kcal</p>
        <p>Price: {props.diet.price}</p>
        <button
          className='addToCartButton'
          onClick={() => props.addToCartFunction(props.diet.id)}
        >
          Add to cart
        </button>
      </div>
      <ExpandMoreButton onClick={toogleShowMeals} />
      {showMeals && (
        <div className='mealsDiv'>
          <h2>Meals:</h2>
          {props.meals.length === 0 && <LoadingComponent />}
          {props.meals.map((meal: MealShort) => (
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
