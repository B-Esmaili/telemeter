// export interface TelemetryDataProvider{

import { ICache } from '../cache';
import { EndPoint, ITransport, TransportSumitResponse } from '../transport';
import { DefaultCache } from './cache';
import { DefaultTransport } from './transport';

// }
const DEFAULT_CHUNK_SIZE = 20;

export interface TelemetryOptions {
  endPoints: EndPoint[];
  transport?: ITransport;
  transportOptions?: Record<string, unknown>;
  transportChunkSize?: number;
  cache?: ICache;
}

class Telemetry {
  private endPoints: EndPoint[];
  private transport: ITransport;
  private transportOptions?: Record<string, unknown>;
  private cache: ICache;
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
    this.transport = transport ?? new DefaultTransport();
    this.transportOptions = transportOptions;
    this.cache = cache ?? new DefaultCache();
    this.chunkSize = transportChunkSize;
  }

  public async send(options?: Record<string, unknown>) {
    await this.sendImpl(options);
  }

  private async sendImpl(options?: Record<string, unknown>) {
    const isSuccessfull = (resp: TransportSumitResponse) =>
      typeof resp === 'boolean' ? resp : resp.successful;

    const dataChunk = this.cache.getBatch(this.chunkSize);

    const aggResult: TransportSumitResponse[] = await Promise.all(
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
