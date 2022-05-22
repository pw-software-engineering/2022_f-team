import { ApiConfig } from "./APIutilities";
import {
  getClientProfileURL,
  getDietDetailsURL,
  getDietsURL,
  getLoginClientURL,
  getMealDetailsURL,
  getMealsURL,
  getRegisterClientURL,
  putDietDetailsURL,
  putMealDetailsURL,
} from "./URLcreator";

export const getRegisterConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getRegisterClientURL() } as ApiConfig);

export const getLoginConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getLoginClientURL() } as ApiConfig);

export const getDietsConfig = (key: string, parameters: string) =>
({
  method: "get",
  header: { Authorization: "Bearer " + key },
  url: getDietsURL() + (parameters.length > 0 ? "?" + parameters : ""),
} as ApiConfig);


export const getMealsConfig = (key: string, parameters: string) =>
({
  method: "get",
  header: { Authorization: "Bearer " + key },
  url: getMealsURL() + (parameters.length > 0 ? "?" + parameters : ""),
} as ApiConfig);

export const getDietDetailsConfig = (key: string, dietId: string) =>
({
  method: "get",
  header: { Authorization: "Bearer " + key },
  url: getDietDetailsURL(dietId),
} as ApiConfig);

export const putDietDetailsConfig = (key: string, dietId: string) =>
({
  method: "put",
  header: { Authorization: "Bearer " + key },
  url: putDietDetailsURL(dietId),
} as ApiConfig);

export const getMealDetailsConfig = (key: string, mealId: string) =>
({
  method: "get",
  header: { Authorization: "Bearer " + key },
  url: getMealDetailsURL(mealId),
} as ApiConfig);

export const putMealDetailsConfig = (key: string, mealId: string) =>
({
  method: "put",
  header: { Authorization: "Bearer " + key },
  url: putMealDetailsURL(mealId),
} as ApiConfig);

export const getClientProfileDataConfig = (key: string) =>
({
  method: "get",
  header: { Authorization: "Bearer " + key },
  url: getClientProfileURL(),
} as ApiConfig);

export const putClientProfileDataConfig = (key: string) =>
({
  method: "put",
  header: { Authorization: "Bearer " + key },
  url: getClientProfileURL(),
} as ApiConfig);
