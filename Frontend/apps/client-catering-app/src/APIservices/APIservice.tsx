import axios from "axios";
import { useState } from "react";
import { ApiResult, ServiceState } from "./APIresult";

export const APIservice = (): ApiResult<string | undefined> => {
  const [result, setResult] = useState<string | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [state, setState] = useState<ServiceState>(ServiceState.NoRequest);

  const execute = (Method: any, Header: any, Body: JSON, Url: string) => {
    setState(ServiceState.InProgress);

    axios({ url: Url, data: Body, method: Method, headers: Header })
      .then((res) => {
        setResult(res.data);
        setState(ServiceState.Fetched);
      })
      .catch((e: any) => {
        const err: Error = { name: e.name, message: e.response.data };
        setError(err);
        setState(ServiceState.Error);
      });
  };

  return { result: result, error: error, state, execute };
};
