export class UnsupportedNetworkError extends Error {
  constructor(network: string) {
    super(`Unsupported network: ${network}`);
  }
}
