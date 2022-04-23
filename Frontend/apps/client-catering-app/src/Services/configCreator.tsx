import { ApiConfig } from "common-components";
import { getDietsURL, getLoginClientURL, getRegisterClientURL } from "./URLcreator";

export const getRegisterConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getRegisterClientURL() } as ApiConfig);

export const getLoginConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getLoginClientURL() } as ApiConfig);

export const getDietsConfig = (key: string) =>
  ({
    method: "get",
    header: {'Authorization': 'Bearer ' + key},
    url: getDietsURL(),
  } as ApiConfig);
