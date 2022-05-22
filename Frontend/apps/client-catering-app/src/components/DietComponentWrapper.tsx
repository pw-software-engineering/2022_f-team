import {
  DietComponent,
  DietModel,
  ErrorToastComponent,
  MealModel,
  MealShort,
  ServiceState,
  UserContext,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import { APIservice } from "../Services/APIservice";
import {
  getDietDetailsConfig,
  getMealDetailsConfig,
} from "../Services/configCreator";

interface DietComponentWrapperProps {
  diet: DietModel;
  onButtonClick: (dietId: string) => void;
}

const DietComponentWrapper = (props: DietComponentWrapperProps) => {
  const service = APIservice();
  let mealService = APIservice();

  const userContext = useContext(UserContext);
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
      getDietDetailsConfig(userContext?.authApiKey!, dietId),
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
      getMealDetailsConfig(userContext?.authApiKey!, mealId),
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
