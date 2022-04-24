import {
  DietComponent,
  ErrorToastComponent,
  LoadingComponent,
  ServiceState,
  UserContext,
  DietModel,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import { APIservice } from "../Services/APIservice";
import {
  getDietDetailsConfig,
  getDietsConfig,
} from "../Services/configCreator";
import "../style/DietComponentStyle.css";

interface MainPageProps {
  AddToCart: (item: string) => void;
}

const MainPage = (props: MainPageProps) => {
  const service = APIservice();
  const serviceMeals = APIservice();
  const userContext = useContext(UserContext);
  const [showError, setShowError] = useState<boolean>(false);

  const [dietsList, setDietsList] = useState<Array<DietModel>>([]);
  const [meals, setMeals] = useState({});

  const query = { Name: "", Name_with: "" };

  const parseFunction = (res: Array<JSON>) => {
    const resultArray: Array<JSON> = [];
    res.forEach((item: JSON) => resultArray.push(item));
    return resultArray;
  };

  const mealsParseFunction = (res: any) => {
    const resultArray: Array<JSON> = [];
    res.meals.forEach((item: any) => resultArray.push(item));
    return { id: res.id, array: resultArray };
  };

  useEffect(() => {
    service.execute!(
      getDietsConfig(userContext?.authApiKey!),
      query,
      parseFunction
    );
  }, []);

  useEffect(() => {
    if (service.state === ServiceState.Fetched) setDietsList(service.result);
    if (service.state === ServiceState.Error) setShowError(true);
  }, [service.state]);

  useEffect(() => {
    if (serviceMeals.state === ServiceState.Fetched)
      changeMealsDataValue(serviceMeals.result.id, serviceMeals.result.array);
    if (serviceMeals.state === ServiceState.Error) setShowError(true);
  }, [serviceMeals.state]);

  const changeMealsDataValue = (label: string, value: string) => {
    setMeals({
      ...meals,
      [label]: value,
    });
  };

  const getMeals = (dietId: string) => {
    serviceMeals.execute!(
      getDietDetailsConfig(userContext?.authApiKey!, dietId),
      {},
      mealsParseFunction
    );
  };

  return (
    <div className="page-wrapper">
      {dietsList.map((item) => (
        <DietComponent
          diet={item}
          addToCartFunction={props.AddToCart}
          getMeals={getMeals}
          meals={meals}
        />
      ))}
      {service.state === ServiceState.InProgress && dietsList.length == 0 && (
        <LoadingComponent />
      )}
      {showError && service.state === ServiceState.Error && (
        <ErrorToastComponent
          message={service.error?.message!}
          closeToast={setShowError}
        />
      )}
      {showError && serviceMeals.state === ServiceState.Error && (
        <ErrorToastComponent
          message={serviceMeals.error?.message!}
          closeToast={setShowError}
        />
      )}
    </div>
  );
};

export default MainPage;
