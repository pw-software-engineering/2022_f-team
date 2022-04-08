import React from 'react'
import { useState } from 'react'
import ExpandMoreButton from './ExpandMoreButton'
import VeganMark from './VeganMark'

const DietComponent = () => {
  const [showMeals, setShowMeals] = useState<boolean>(false)
  const toogleShowMeals = (): void => setShowMeals(!showMeals)

  return (
    <div className='diet-div'>
      <div className='diet-header-div'>
        <h1>DietName</h1>
        <VeganMark />
      </div>
      <p className='description'>
        Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </p>
      <div className='calories-price-div'>
        <p>Calories: xxx</p>
        <p>Price: xxx</p>
        <button className='addToCartButton'>Add to cart</button>
      </div>
      <ExpandMoreButton onClick={toogleShowMeals} />
      {showMeals && (
        <div className='mealsDiv'>
          <h2>Meals:</h2>
          <div className='meal-row'>
            <p>Name</p>
            <p>Calories: xxx</p>
          </div>
          <div className='meal-row'>
            <p>Name name hsbcusidbcuisdbvcuiwvbiuwbviu</p>
            <p>Calories: xxx</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DietComponent
