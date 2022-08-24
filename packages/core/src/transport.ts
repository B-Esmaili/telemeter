import { IPayload } from './telemetry';
export type TransportSumitResponse = { successful: boolean } | boolean;

export interface EndPoint {
  url: string;
  name: string;
}

export interface ITransportOptions<
  TOptions extends Record<string, unknown> = DefaultTransportOptions
> {
  payload: IPayload[];
  options?: TOptions;
}

export interface DefaultTransportOptions extends Record<string, unknown> {
  method?: 'GET' | 'POST';
  headers?: HeadersInit;
}

export interface ITransport<
  TResponse extends TransportSumitResponse = TransportSumitResponse,
  TOptions extends Record<string, unknown> = DefaultTransportOptions
> {
  submit: (
    endpoint: EndPoint,
    options: ITransportOptions<TOptions>
  ) => Promise<TResponse>;
}