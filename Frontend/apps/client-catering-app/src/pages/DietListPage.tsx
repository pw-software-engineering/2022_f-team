import { DietComponent, DietModel, MealModel } from "common-components";
import "../style/DietComponentStyle.css";

const DietListPage = () => {
  const MockedMealsArr: MealModel[] = [
    {
      mealId: "1",
      name: "meal1",
      ingredientList: ["ingr1, ing2"],
      allergenList: ["all1,all2"],
      calories: 123,
      vegan: true,
    } as MealModel,
    {
      mealId: "2",
      name: "meal2",
      ingredientList: ["ingr1, ing2"],
      allergenList: ["all1,all2"],
      calories: 321,
      vegan: true,
    } as MealModel,
  ];
  const mockeddiet: DietModel = {
    dietId: "1",
    title: "diet1",
    description:
      "Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed  do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit  in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui  officia deserunt mollit anim id est laborum.",
    calories: 1234,
    vegan: true,
    meals: MockedMealsArr,
  } as DietModel;
  return (
    <div className="page-wrapper">
      <DietComponent diet={mockeddiet} />
    </div>
  );
};

export default DietListPage;
