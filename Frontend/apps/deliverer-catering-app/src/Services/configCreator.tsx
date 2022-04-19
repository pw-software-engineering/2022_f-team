import { ApiConfig } from "common-components";
import { getLoginDelivererURL } from "./URLcreator";

export const getLoginConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getLoginDelivererURL() } as ApiConfig);
