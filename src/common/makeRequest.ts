import { redirect } from "next/navigation";
import { z } from "zod";

import { getApiUrl, isServer, logger } from "@/common";

import { getServerError, type ServerError } from "./getServerError";

export interface HttpResponse<Data> extends Response {
  data: Data;
  error: ServerError | null;
}

export const makeRequest = async <Data>(
  url: string,
  params?: Partial<{
    method: "GET" | "POST" | "DELETE";
    headers: Headers;
    body: BodyInit;
    schema: z.ZodTypeAny;
  }>,
): Promise<HttpResponse<Data>> => {
  const { method, headers, body, schema } = params ?? {
    method: "GET",
    headers: undefined,
    body: null,
  };

  if (headers && !headers.has("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (body) {
    requestOptions.body = body;
  }

  try {
    logger.log("Url: ", url);
    const res = (await fetch(
      `${getApiUrl()}${url}`,
      requestOptions,
    )) as HttpResponse<Data>;

    res.error = null;

    try {
      const data = await res.json();

      res.data = data;
    } catch (error) {
      if (![200, 204, 401].includes(res.status)) {
        logger.log(
          "Response parsing error. Ask your backend team to send correct JSON.",
          error,
        );

        throw error;
      }
    }

    logger.log(String(res.status));

    if (!res.ok) {
      res.error = getServerError(res);
    }

    if (res.error?.key === "UNAUTHORIZED") {
      if (isServer()) {
        redirect("/auth");
      } else {
        window.location.href = window.location.origin + "/auth";
      }
    }

    try {
      schema?.parse(res.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(
          "invalid json schema: ",
          error,
          new Error("invalid json schema"),
        );

        throw error;
      }
    }

    return res;
  } catch (error) {
    if (!(error instanceof z.ZodError)) {
      logger.log("Network or parsing error: ", error);
    }

    throw error;
  }
};
