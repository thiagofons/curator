export const API_GATEWAY_URL = "http://localhost:3300";

export async function callTrpc(request: any, router: string, method: string) {
  const res = await request.get(`${API_GATEWAY_URL}/trpc/${router}.${method}`);
  if (!res.ok()) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `tRPC call failed: ${res.status} ${res.statusText} - ${text}`,
    );
  }

  const body = await res.json().catch(() => ({}));
  return body.result?.data ?? body;
}
