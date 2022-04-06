import { ApiConfig } from "./APIutilities";
import { getRegisterClientURL } from "./URLcreator";

export const getRegisterConfig = (): ApiConfig =>
  ({ method: "post", header: "", url: getRegisterClientURL() } as ApiConfig);
