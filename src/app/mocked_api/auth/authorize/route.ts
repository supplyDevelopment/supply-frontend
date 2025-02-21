import { logger } from "@/common";

export async function POST(request: Request): Promise<Response> {
  const headers = new Headers();
  const body = (await request.json()) as { email: string; password: string };

  logger.log("Body: ", body);

  if (body.email !== "test" && body.password !== "test") {
    return new Response(JSON.stringify(""), { status: 401 });
  }

  headers.append("Set-Cookie", "refresh_token=adfadsf;Path=/");
  headers.append("Set-Cookie", "access_token=adfadsfasdkfksjhl;Path=/");

  return new Response(JSON.stringify(""), {
    status: 200,
    headers,
  });
}
