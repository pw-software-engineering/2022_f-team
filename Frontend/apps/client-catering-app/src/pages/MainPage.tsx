import { DietComponent, MealModel, ServiceState, UserContext } from "common-components";
import { DietModel, GetDietsQuery } from "common-components/dist/models/DietModel";
import { useContext, useEffect, useState } from "react";
import { APIservice } from "../Services/APIservice";
import { getDietsConfig } from "../Services/configCreator";
import "../style/DietComponentStyle.css"

const MainPage = () => {
  const service = APIservice();
  const userContext = useContext(UserContext);

  const [dietsList, setDietsList] = useState<Array<DietModel>>([]);
  const [mealsList, setMealsList] = useState<Array<MealModel>>([]);

  const query = {Name:"", Name_with:""};

  const parseFunction = (res:Array<JSON>)=>{
    const resultArray: Array<JSON> = [];
    res.forEach((item:JSON)=>resultArray.push(item));
    return resultArray;
  }

  useEffect(()=>{
    service.execute!(getDietsConfig(userContext?.authApiKey!), query, parseFunction);
  },[]);

  useEffect(()=>{
    if(service.state==ServiceState.Fetched)
      setDietsList(service.result)
  }, [service.state])

  return (
    <div className="page-wrapper">
      {dietsList.map((item)=><DietComponent diet={item} meals={mealsList}/>)}      
    </div>
  );
};

export default MainPage;