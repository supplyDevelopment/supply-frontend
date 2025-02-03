import { type NextRequest, NextResponse } from "next/server";

import { logger } from "@/common";

import { getUserInfo, mapUserDataToClientData } from "./server";

export async function middleware(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  try {
    const url = new URL(req.url);
    const authUrl = new URL(url.origin + "/auth");

    if (url.pathname === "/") {
      const cookie = req.headers.get("Cookie");

      logger.log("Cookie: ", cookie);

      if (!cookie) {
        return NextResponse.redirect(authUrl);
      }

      const { data, error, headers } = await getUserInfo(cookie);

      logger.log("Server error /get_user_info: ", error);

      if (error?.key === "UNAUTHORIZED") {
        return NextResponse.redirect(authUrl);
      }

      const setCookieHeader = headers.get("Set-Cookie");

      logger.log("Set-Cookie /get_user_info", setCookieHeader);
      logger.log("Data /get_user_info: ", data);

      const res = NextResponse.next();
      res.headers.set(
        "x-user-info",
        encodeURI(JSON.stringify(mapUserDataToClientData(data))),
      );

      if (setCookieHeader) {
        res.headers.set("Set-Cookie", setCookieHeader);
      }

      return res;
    }
  } catch {
    return NextResponse.next();
  }

  return NextResponse.next();
}
