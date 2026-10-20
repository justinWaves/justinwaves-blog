import { getWriteClient } from "@/lib/sanity/write-client";
import { handleComment, methodNotAllowed } from "@/lib/server/handlers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleComment(request, { getClient: getWriteClient });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const PATCH = methodNotAllowed;
