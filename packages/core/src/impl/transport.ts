import {
  DefaultTransportOptions,
  EndPoint,
  ITransport,
  ITransportOptions,
  TransportSumitResponse,
} from '../transport';

export class DefaultTransport implements ITransport {
  async submit(
    endpoint: EndPoint,
    options: ITransportOptions<DefaultTransportOptions>
  ): Promise<TransportSumitResponse> {
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(options.payload),
      ...options.options,
    };

    const resp = await fetch(endpoint.url, fetchOptions);
    const result = (await resp.json()) as TransportSumitResponse;
    return result;
  }
}
