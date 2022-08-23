import { TelemetryPayload } from "../telemetry/telemetry";

export enum TelemetryEntryCategory {
  'Exception',
  'Performance',
}

export interface TelemetryCacheEntry extends TelemetryPayload {
  id: string;
  category: TelemetryEntryCategory;
}

export interface TelemetryCache {
  getById: (id: string) => TelemetryCacheEntry;
  getBatch: (count : number)=> TelemetryCacheEntry[]
}
