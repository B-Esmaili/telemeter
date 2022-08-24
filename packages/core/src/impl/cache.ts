import { ICache, ICacheEntry } from '../cache';
import { TelemetryEntryCategory } from '../telemetry';

export class DefaultCache implements ICache {
  getById(id: string): ICacheEntry {
    return {
      id: id,
      category: TelemetryEntryCategory.Exception,
      data: {},
    };
  }

  getBatch(count: number) {
    return [
      {
        id: count.toString(),
        category: TelemetryEntryCategory.Exception,
        data: {},
      },
    ];
  }
}
