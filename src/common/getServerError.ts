import type { HttpResponse } from "./makeRequest";

type ErrorKey = "INTERNAL" | "PREDICTABLE" | "UNAUTHORIZED" | "UNPREDICTABLE";

export interface ServerError {
  key: ErrorKey;
  userMessage: string;
}

interface Server500Error {
  key: ErrorKey;
}

interface Server400Error {
  key: ErrorKey;
}

interface Server401Error {
  key: ErrorKey;
}

interface Http500Response extends HttpResponse<Server500Error> {
  error: null;
}

interface Http400Response extends HttpResponse<Server400Error> {
  error: null;
}

interface Http401Response extends HttpResponse<Server401Error> {
  error: null;
}

const isServer500Error = (res: HttpResponse<unknown>): res is Http500Response =>
  res.status === 500;

const isServer400Error = (res: HttpResponse<unknown>): res is Http400Response =>
  res.status === 400;

const isServer401Error = (res: HttpResponse<unknown>): res is Http401Response =>
  res.status === 401;

export const getServerError = (res: HttpResponse<unknown>): ServerError => {
  if (isServer500Error(res)) {
    return {
      key: "INTERNAL",
      userMessage: "Непредвиденная ошибка для сервера.",
    };
  }

  if (isServer400Error(res)) {
    return {
      key: "PREDICTABLE",
      userMessage: "400 ошибка сервера.",
    };
  }

  if (isServer401Error(res)) {
    return {
      key: "UNAUTHORIZED",
      userMessage: "Не авторизован.",
    };
  }

  return {
    key: "UNPREDICTABLE",
    userMessage: "Непредвиденный код ошибки сервера.",
  };
};
