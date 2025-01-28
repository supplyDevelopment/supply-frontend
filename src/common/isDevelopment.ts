export const isDevelopment = (): boolean => {
  return process.env.NEXT_PUBLIC_ENV === "development";
};
