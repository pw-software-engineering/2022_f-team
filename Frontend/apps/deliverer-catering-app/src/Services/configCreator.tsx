import { ApiConfig } from "common-components";
import { getLoginDelivererURL, getDelivererOrdersURL, postDeliverOrderURL } from "./URLcreator";

export const getLoginConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getLoginDelivererURL() } as ApiConfig);

export const getDelivererOrdersConfig = (key: string, parameters: string) =>
({
  method: "get",
  header: { Authorization: "Bearer " + key },
  url:
    getDelivererOrdersURL() + (parameters.length > 0 ? "?" + parameters : ""),
} as ApiConfig);

export const postOrderDeliverConfig = (key: string, orderId: string) =>
({
  method: "post",
  header: { Authorization: "Bearer " + key },
  url: postDeliverOrderURL(orderId),
} as ApiConfig);
