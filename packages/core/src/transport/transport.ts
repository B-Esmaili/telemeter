export interface DefaultTransportOptions extends Record<string, unknown> {
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
}
