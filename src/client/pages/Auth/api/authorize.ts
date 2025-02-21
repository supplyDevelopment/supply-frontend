import { makeRequest } from "@/common";

import type { HttpResponse } from "@/common/types";

interface AuthorizeParams {
  login: string;
  password: string;
}

export const authorize = async (
  params: AuthorizeParams,
): Promise<HttpResponse<void>> => {
  return await makeRequest<void>(`/auth/authorize`, {
    method: "POST",
    body: JSON.stringify({
      email: params.login,
      password: params.password,
    }),
  });
};
