export const getApiUrl = (): string =>
  process.env.NEXT_PUBLIC_API_URL ?? "mocked_api";
