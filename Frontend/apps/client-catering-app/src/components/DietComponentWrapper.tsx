import {
  DietComponent,
  DietModel,
  ErrorToastComponent,
  MealShort,
  ServiceState,
  UserContext,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import { APIservice } from "../Services/APIservice";
import { getDietDetailsConfig } from "../Services/configCreator";

interface DietComponentWrapperProps {
  diet: DietModel;
  addToCartFunction: (dietId: string) => void;
}

const DietComponentWrapper = (props: DietComponentWrapperProps) => {
  const service = APIservice();
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);
  const [meals, setMeals] = useState<Array<MealShort>>([]);

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

  return (
    <div>
      <DietComponent
        diet={props.diet}
        addToCartFunction={props.addToCartFunction}
        getMeals={getMeals}
        meals={meals}
      />
      {showError && (
        <ErrorToastComponent
          message={service.error?.message!}
          closeToast={setShowError}
        />
      )}
    </div>
  );
};

export default DietComponentWrapper;
