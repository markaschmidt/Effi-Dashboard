import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = process.env.EFFI_API_KEY;
  if (!token) {
    return Response.json({ error: "EFFI_API_KEY is not configured" }, { status: 503 });
  }
  return Response.json({ token });
}
