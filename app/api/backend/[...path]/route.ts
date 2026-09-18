import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const BACKEND = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(
  /\/$/,
  "",
);

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const apiKey = process.env.EFFI_API_KEY;
  if (!apiKey) {
    return new Response("EFFI_API_KEY is not configured", { status: 503 });
  }

  const { path } = await context.params;
  const destination = `${BACKEND}/${path.join("/")}${request.nextUrl.search}`;
  const headers = new Headers();
  headers.set("X-API-Key", apiKey);
  const contentType = request.headers.get("content-type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();
  const response = await fetch(destination, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  });
  const responseHeaders = new Headers();
  const contentType = response.headers.get("Content-Type") ?? "application/json";
  responseHeaders.set("Content-Type", contentType);
  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const DELETE = proxy;
