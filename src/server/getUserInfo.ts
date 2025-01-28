import { makeRequest } from "@/common";

import type { HttpResponse } from "@/common/types";

interface Data {
  active_chat_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ClientData {
  activeChatId: number;
  email: string;
  firstName: string;
  lastName: string;
}

export const mapDataToClientData = (data: Data): ClientData => {
  return {
    activeChatId: data.active_chat_id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
  };
};

export const getUserInfo = async (
  Cookie: string,
): Promise<HttpResponse<Data>> => {
  return await makeRequest<Data>("/profile/get_user_info", {
    headers: new Headers({ Cookie }),
  });
};
