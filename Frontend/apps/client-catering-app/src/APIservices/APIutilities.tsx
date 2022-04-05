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

export interface ApiConfig {
  method: any;
  header: any;
  url: string;
}