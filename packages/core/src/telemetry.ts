
export interface IPayload<
  TData extends Record<string, unknown> = Record<string, unknown>
> {
  data: TData;
  category: TelemetryEntryCategory;
}

export enum TelemetryEntryCategory {
  'Exception',
  'Performance',
}