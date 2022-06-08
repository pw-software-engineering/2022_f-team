import { ApiConfig } from "common-components";
import {
  getClientProfileURL,
  getDietDetailsURL,
  getDietsURL,
  getLoginClientURL,
  getMealDetailsURL,
  getOrdersURL,
  getRegisterClientURL,
  postClientOrderURL,
  postComplainURL,
  postPayForOrderURL,
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

export const getOrdersConfig = (key: string, parameters: string) =>
  ({
    method: "get",
    header: { Authorization: "Bearer " + key },
    url: getOrdersURL() + (parameters.length > 0 ? "?" + parameters : ""),
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

export const postClientOrderConfig = (key: string) =>
  ({
    method: "post",
    header: { Authorization: "Bearer " + key },
    url: postClientOrderURL(),
  } as ApiConfig);

export const postPayForOrderConfig = (key: string, orderId: string) =>
  ({
    method: "post",
    header: { Authorization: "Bearer " + key },
    url: postPayForOrderURL(orderId),
  } as ApiConfig);

export const postComplainConfig = (key: string, orderId: string) =>
  ({
    method: "post",
    header: { Authorization: "Bearer " + key },
    url: postComplainURL(orderId),
  } as ApiConfig);
