import { makeRequest } from "@/common";

import type { HttpResponse } from "@/common/types";

interface AuthRegistrCompanyParams {
  email: string;
}

export const authRegistrCompany = async (
  params: AuthRegistrCompanyParams,
): Promise<HttpResponse<void>> => {
  return await makeRequest<void>(`/auth/register_company`, {
    method: "POST",
    body: JSON.stringify(params),
  });
};
