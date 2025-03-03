import { makeRequest } from "@/common";

import type { HttpResponse } from "@/common/types";

interface Data {
  permissions: string[];
  subscription_end_date: Date;
}

export interface ClientData {
  permissions: string[];
  subscriptionEndDate: Date;
}

export const mapDataToClientData = (data: Data): ClientData => {
  return {
    subscriptionEndDate: data.subscription_end_date,
    permissions: data.permissions,
  };
};

export const getUserInfo = async (
  Cookie: string,
): Promise<HttpResponse<Data>> => {
  return await makeRequest<Data>("/profile/user_info", {
    headers: new Headers({ Cookie }),
  });
};
