import { ApiConfig } from "common-components";
import { getDietDetailsURL, getDietsURL, getLoginProducerURL, getMealDetailsURL } from "./URLcreator";

export const getLoginConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getLoginProducerURL() } as ApiConfig);

export const getDietsConfig = (key: string, parameters: string) =>
({
  method: "get",
  header: { Authorization: "Bearer " + key },
  url: getDietsURL() + (parameters.length > 0 ? "?" + parameters : ""),
} as ApiConfig);

export const getDietDetailsConfig = (key: string, dietId: string) =>
({
  method: "get",
  header: { Authorization: "Bearer " + key },
  url: getDietDetailsURL(dietId),
} as ApiConfig);

export const getMealDetailsConfig = (key: string, mealId: string) =>
({
  method: "get",
  header: { Authorization: "Bearer " + key },
  url: getMealDetailsURL(mealId),
} as ApiConfig);
