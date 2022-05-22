import React from "react";
import { useEffect, useState } from "react";
import { ErrorToastComponent } from "../Atoms/ErrorToastComponent";
import { UserContextInterface } from "../Context/UserContext";
import { DietModel } from "../models/DietModel";
import { MealModel, MealShort } from "../models/MealModel";
import { APIservice } from "../Services/APIservice";
import { ServiceState } from "../Services/APIutilities";
import {
  getDietDetailsConfig,
  getMealDetailsConfig,
} from "../Services/configCreator";
import DietComponent from "./DietComponent";

interface DietComponentWrapperProps {
  diet: DietModel
  userContext: UserContextInterface | null
  onButtonClick: (dietId: string) => void
  buttonLabel?: string
}

const DietComponentWrapper = (props: DietComponentWrapperProps) => {
  const service = APIservice();
  let mealService = APIservice();

  const [showError, setShowError] = useState<boolean>(false);
  const [meals, setMeals] = useState<Array<MealShort>>([]);

  const [mealToDisplay, setMealToDisplay] = useState<MealModel | undefined>(
    undefined
  );

  const mealsParseFunction = (res: any) => {
    const resultArray: Array<JSON> = [];
    res.meals.forEach((item: any) => resultArray.push(item));
    return resultArray;
  };

  const getMeals = (dietId: string) => {
    service.execute!(
      getDietDetailsConfig(props.userContext?.authApiKey!, dietId),
      {},
      mealsParseFunction
    );
  };

  useEffect(() => {
    if (service.state === ServiceState.Fetched) setMeals(service.result);
    if (service.state === ServiceState.Error) setShowError(true);
  }, [service.state]);

  const queryForMeal = (mealId: string) => {
    mealService.execute!(
      getMealDetailsConfig(props.userContext?.authApiKey!, mealId),
      {}
    );
  };

  useEffect(() => {
    if (mealService.state === ServiceState.Fetched)
      setMealToDisplay(mealService.result);
    if (mealService.state === ServiceState.Error) setShowError(true);
  }, [mealService.state]);

  return (
    <div>
      <DietComponent
        diet={props.diet}
        onButtonClick={props.onButtonClick}
        getMeals={getMeals}
        meals={meals}
        queryForMeal={queryForMeal}
        mealToDisplay={mealToDisplay}
        setMealToDisplay={setMealToDisplay}
        buttonLabel={props.buttonLabel}
      />
      {showError && service.state === ServiceState.Error && (
        <ErrorToastComponent
          message={service.error?.message!}
          closeToast={setShowError}
        />
      )}
      {showError && mealService.state === ServiceState.Error && (
        <ErrorToastComponent
          message={mealService.error?.message!}
          closeToast={setShowError}
        />
      )}
    </div>
  );
};

export default DietComponentWrapper;
