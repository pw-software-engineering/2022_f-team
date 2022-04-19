import { ApiConfig } from "common-components";
import { getLoginProducerURL } from "./URLcreator";

export const getLoginConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getLoginProducerURL() } as ApiConfig);
