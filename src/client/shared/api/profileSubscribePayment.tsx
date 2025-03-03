import { makeRequest } from "@/common";

import type { HttpResponse } from "@/common/types";

interface SubscribePaymentParams {
  amount: number;
  monthsCount: number;
}

interface Data {
  payment_url: string;
}

export const profileSubscribePayment = async (
  params: SubscribePaymentParams,
): Promise<HttpResponse<Data>> => {
  return await makeRequest<Data>(`/profile/subscribe/payment`, {
    method: "POST",
    body: JSON.stringify(params),
  });
};
