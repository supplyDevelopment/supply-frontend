import { makeRequest } from "@/common";

import type { HttpResponse } from "@/common/types";

interface ProfileComopanyUpdateParams {
  email: string;
}

export const profileCompanyUpdate = async ({
  email,
}: ProfileComopanyUpdateParams): Promise<HttpResponse<void>> => {
  return await makeRequest<void>(`/profile/company/update`, {
    method: "POST",
    body: JSON.stringify([{ email }]),
  });
};
