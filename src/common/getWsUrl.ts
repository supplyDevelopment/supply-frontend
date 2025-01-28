export const getWsUrl = (): string =>
  process.env.NEXT_PUBLIC_WS_URL ?? "mocked_ws";
