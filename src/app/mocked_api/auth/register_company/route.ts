import { logger } from "@/common";

export async function POST(request: Request): Promise<Response> {
  const headers = new Headers();
  const body = (await request.json()) as { email: string };

  logger.log("Body: ", body);

  headers.append("Set-Cookie", "refresh_token=adfadsf;Path=/");
  headers.append("Set-Cookie", "access_token=adfadsfasdkfksjhl;Path=/");

  return new Response(JSON.stringify({}), {
    status: 200,
    headers,
  });
}
