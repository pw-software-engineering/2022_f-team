import { ApiConfig } from "common-components";
import {
  getClientProfileURL,
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

export const getDietsConfig = (key: string, query: string) =>
  ({
    method: "get",
    header: { Authorization: "Bearer " + key },
    url: getDietsURL(query),
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
