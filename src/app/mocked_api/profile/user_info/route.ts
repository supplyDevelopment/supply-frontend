export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
      subscription_end_date: "2025-03-03",
    }),
    {
      status: 200,
    },
  );
}
