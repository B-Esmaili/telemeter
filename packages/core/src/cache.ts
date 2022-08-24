import { IPayload } from './telemetry';

export interface ICacheEntry extends IPayload {
  id: string;
}

export interface ICache {
  getById: (id: string) => ICacheEntry;
  getBatch: (count: number) => ICacheEntry[];
}
