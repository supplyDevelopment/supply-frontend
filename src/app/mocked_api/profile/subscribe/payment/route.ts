import { logger } from "@/common";

export async function POST(request: Request): Promise<Response> {
  logger.log("Request:", request);

  return new Response(
    JSON.stringify({
      payment_url: new URL(request.url).origin + "/registr/handler",
    }),
    {
      status: 200,
    },
  );
}
