export interface ApiResult<T> {
  result: T;
  error?: Error;
  state: ServiceState;
  execute?: Function | undefined;
}

export enum ServiceState {
  NoRequest,
  InProgress,
  Fetched,
  Error,
}
