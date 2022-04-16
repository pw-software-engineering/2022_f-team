import axios from "axios";
import { useState } from "react";
import { ApiConfig, ApiResult, ServiceState } from "./APIutilities";

export const APIservice = (): ApiResult<string | undefined> => {
  const [result, setResult] = useState<string | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [state, setState] = useState<ServiceState>(ServiceState.NoRequest);

  const execute = (config: ApiConfig, body: JSON, callback: Function) => {
    setState(ServiceState.InProgress);

    axios({ url: config.url, data: body, method: config.method, headers: config.header })
      .then((res) => {
        setResult(res.data);
        setState(ServiceState.Fetched);

        callback(res.data);
      })
      .catch((e: any) => {
        setError({ name: e.name, message: e.response.data } as Error);
        setState(ServiceState.Error);
      });
  };

  return { result, error, state, execute };
};
