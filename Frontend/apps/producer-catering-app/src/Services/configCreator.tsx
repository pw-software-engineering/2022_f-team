import { ApiConfig } from "common-components";
import {
  getDietDetailsURL,
  getDietsURL,
  getLoginProducerURL,
  getMealDetailsURL,
  getProducerOrdersURL,
  postCompleteOrderURL,
  putDietDetailsURL,
  putMealDetailsURL,
} from "./URLcreator";

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

export const putDietDetailsConfig = (key: string, dietId: string) =>
  ({
    method: "put",
    header: { Authorization: "Bearer " + key },
    url: putDietDetailsURL(dietId),
  } as ApiConfig);

export const putMealDetailsConfig = (key: string, mealId: string) =>
  ({
    method: "put",
    header: { Authorization: "Bearer " + key },
    url: putMealDetailsURL(mealId),
  } as ApiConfig);

export const getProducerOrdersConfig = (key: string, parameters: string) =>
  ({
    method: "get",
    header: { Authorization: "Bearer " + key },
    url:
      getProducerOrdersURL() + (parameters.length > 0 ? "?" + parameters : ""),
  } as ApiConfig);

export const postOrderCompleteConfig = (key: string, orderId: string) =>
  ({
    method: "post",
    header: { Authorization: "Bearer " + key },
    url: postCompleteOrderURL(orderId),
  } as ApiConfig);
