import { logger } from "@/common";

export const wait = async (ms: number = 1000): Promise<void> => {
  logger.log(`wait ${ms}ms`);
  await new Promise<string>(resolve => {
    setTimeout(() => {
      resolve("");
    }, ms);
  });
};
