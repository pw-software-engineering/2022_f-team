import React from 'react'
import ExpandMoreButton from './ExpandMoreButton';

const DietComponent = () => {
    return (
      <div className="diet-div">
        <h1>DietName</h1>
        <p>Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Calories: xxx</p>
        <p>Price: xxx</p>
        <button>Add to cart</button>
        <ExpandMoreButton />
        <div>
            Meals
        </div>
      </div>
    );
  };
  
  export default DietComponent;