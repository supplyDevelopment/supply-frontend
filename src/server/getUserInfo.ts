import { makeRequest } from "@/common";

import type { HttpResponse } from "@/common/types";

interface Data {
  permissions: string[];
  subscription_end_date: string;
  email: {
    email: string;
  };
}

export interface ClientData {
  permissions: string[];
  subscriptionEndDate: Date;
  email: string;
}

export const mapDataToClientData = (data: Data): ClientData => {
  return {
    subscriptionEndDate: new Date(data.subscription_end_date),
    permissions: data.permissions,
    email: data.email.email,
  };
};

export const getUserInfo = async (
  Cookie: string,
): Promise<HttpResponse<Data>> => {
  return await makeRequest<Data>("/profile/user_info", {
    headers: new Headers({ Cookie }),
  });
};
