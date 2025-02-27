export async function POST(): Promise<Response> {
  return new Response(
    JSON.stringify({
      payment_url: "https://sandushnilas.space",
    }),
    {
      status: 200,
    },
  );
}
