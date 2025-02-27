export async function GET(): Promise<Response> {
  return new Response(JSON.stringify({}), {
    status: 200,
  });
}
