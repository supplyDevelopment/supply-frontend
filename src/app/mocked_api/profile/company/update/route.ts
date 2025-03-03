export async function POST(): Promise<Response> {
  return new Response(JSON.stringify({}), {
    status: 200,
  });
}
