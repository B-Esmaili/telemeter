// export interface TelemetryDataProvider{

import { TelemetryCache } from '../cache/cache';
import { DefaultTransportOptions } from '../transport';

// }
const DEFAULT_CHUNK_SIZE = 20;

export interface TelemetryOptions {
  endPoints: EndPoint[];
  transport: TelemetryTransport;
  transportOptions?: Record<string, unknown>;
  transportChunkSize: number;
  cache: TelemetryCache;
}

export interface EndPoint {
  url: string;
  name: string;
}

export type TelemetrySumitResponse = { successful: boolean } | boolean;

export interface TelemetryPayload<
  TData extends Record<string, unknown> = Record<string, unknown>
> {
  data: TData;
  class: string;
}

export interface TelemetryTransportOptions<
  TOptions extends Record<string, unknown> = DefaultTransportOptions
> {
  payload: TelemetryPayload[];
  options?: TOptions;
}

export interface TelemetryTransport<
  TResponse extends TelemetrySumitResponse = boolean,
  TOptions extends Record<string, unknown> = DefaultTransportOptions
> {
  submit: (
    endpoint: EndPoint,
    options: TelemetryTransportOptions<TOptions>
  ) => Promise<TResponse>;
}

class Telemetry {
  private endPoints: EndPoint[];
  private transport: TelemetryTransport;
  private transportOptions?: Record<string, unknown>;
  private cache: TelemetryCache;
  private chunkSize: number;

  constructor(options: TelemetryOptions) {
    const {
      endPoints,
      transport,
      transportOptions,
      cache,
      transportChunkSize = DEFAULT_CHUNK_SIZE,
    } = options;
    
    this.endPoints = endPoints;
    this.transport = transport;
    this.transportOptions = transportOptions;
    this.cache = cache;
    this.chunkSize = transportChunkSize;
  }

  public async send(options?: Record<string, unknown>) {
    await this.sendImpl(options);
  }

  private async sendImpl(options?: Record<string, unknown>) {
    const isSuccessfull = (resp: TelemetrySumitResponse) =>
      typeof resp === 'boolean' ? resp : resp.successful;

    const dataChunk = this.cache.getBatch(this.chunkSize);

    const aggResult: TelemetrySumitResponse[] = await Promise.all(
      this.endPoints.map((ep) =>
        this.transport.submit(ep, {
          payload: dataChunk,
          options: options ?? this.transportOptions,
        })
      )
    );

    const failedResults = aggResult.filter((r) => !isSuccessfull(r));

    if (failedResults) {
      //TODO: handle error
    }
  }
}

export { Telemetry };
