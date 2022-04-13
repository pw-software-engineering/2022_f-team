import React from 'react'
import { useState } from 'react'
import ExpandMoreButton from '../Atoms/ExpandMoreButton'
import MealComponent from './MealComponent'
import { DietModel } from '../models/DietModel'
import { MealModel } from '../models/MealModel'
import VeganMark from '../Atoms/VeganMark'
import MealRow from '../Atoms/MealRow'
import Pagination from './Pagination'

interface DietComponentProps {
  diet: DietModel
}

const DietComponent = (props: DietComponentProps) => {
  const [mealToOpenInModal, setMealToOpenInModal] = useState<
    MealModel | undefined
  >(undefined)
  const [showMeals, setShowMeals] = useState<boolean>(false)
  const toogleShowMeals = (): void => setShowMeals(!showMeals)

  const pageCount = 9;
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const onNextClick = () => {
    setCurrentPageIndex(currentPageIndex + (currentPageIndex < pageCount - 1 ? 1 : 0));
  }

  const onPreviousClick = () => {
    setCurrentPageIndex(currentPageIndex - (currentPageIndex > 0 ? 1 : 0));
  }

  const onNumberClick = (index: number) => {
    if (index >= 0 && index < pageCount) {
      setCurrentPageIndex(index);
    }
  }

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
      <div style={{ width: '100%', textAlign: 'center' }}><ExpandMoreButton onClick={toogleShowMeals} /></div>
      {showMeals && (
        <div className='mealsDiv'>
          <h2>Meals:</h2>
          {props.diet.meals.map((meal: MealModel) => (
            <MealRow key={meal.mealId} meal={meal} setMealToOpenInModal={setMealToOpenInModal} />
          ))}
          <Pagination key={'pagination'} index={currentPageIndex} pageCount={pageCount} onNextClick={onNextClick} onPreviousClick={onPreviousClick} onNumberClick={onNumberClick} />
          {mealToOpenInModal !== undefined && (
            <MealComponent
              key={'mealComponent'}
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
