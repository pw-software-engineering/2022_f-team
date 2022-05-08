import { ApiConfig } from "common-components";
import {
  getDietDetailsURL,
  getDietsURL,
  getLoginClientURL,
  getMealDetailsURL,
  getRegisterClientURL,
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
