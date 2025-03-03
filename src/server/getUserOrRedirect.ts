import { redirect } from "next/navigation";

import type { UserClientData } from "./types";
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export const getUserOrRedirect = (headers: ReadonlyHeaders): UserClientData => {
  const xUserInfo = headers.get("x-user-info");

  if (!xUserInfo) {
    return redirect("/auth");
  }

  const user = JSON.parse(decodeURI(xUserInfo)) as UserClientData;

  return { ...user, subscriptionEndDate: new Date(user.subscriptionEndDate) };
};
