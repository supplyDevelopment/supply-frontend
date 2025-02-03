import { makeRequest } from "@/common";

import type { HttpResponse } from "@/common/types";

interface Data {
  permissions: string[];
  subscriptionEndDate: Date;
}

export interface ClientData {
  permissions: string[];
  subscriptionEndDate: Date;
}

export const mapDataToClientData = (data: Data): ClientData => {
  return data;
};

export const getUserInfo = async (
  Cookie: string,
): Promise<HttpResponse<Data>> => {
  return await makeRequest<Data>("/profile/get_user_info", {
    headers: new Headers({ Cookie }),
  });
};
