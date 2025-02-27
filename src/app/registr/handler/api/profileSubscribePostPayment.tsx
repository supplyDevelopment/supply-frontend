import { makeRequest } from "@/common";

import type { HttpResponse } from "@/common/types";

export const profileSubscribePostPayment = async (): Promise<
  HttpResponse<void>
> => {
  return await makeRequest<void>(`/profile/subscribe/post_payment`, {
    method: "GET",
  });
};
