import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDefinition } from "@/lib/cms/content/registry";
import { ContentNotFoundError, getContentRecord, resetContent, saveContent } from "@/lib/cms/content/store";
import { listRevisions } from "@/lib/cms/content/history";
import type { ContentDefinition } from "@/lib/cms/content/types";
import { editorEmail } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ key: string[] }> };

async function keyFrom(params: Params["params"]): Promise<string> {
  const { key } = await params;
  return key.map(decodeURIComponent).join("/");
}

function revalidateFor(def: ContentDefinition) {
  if (def.path === "*") revalidatePath("/", "layout");
  else if (def.path) revalidatePath(def.path);
}

function errorResponse(error: unknown) {
  const status = error instanceof ContentNotFoundError ? 404 : 500;
  return NextResponse.json({ success: false, error: (error as Error).message }, { status });
}

export async function GET(req: Request, { params }: Params) {
  const key = await keyFrom(params);
  const def = getDefinition(key);
  if (!def) return NextResponse.json({ success: false, error: `Unknown content key: ${key}` }, { status: 404 });

  // ?history=1 → saved versions of this document, newest first.
  if (new URL(req.url).searchParams.get("history")) {
    return NextResponse.json({ success: true, data: await listRevisions(key) });
  }

  const record = await getContentRecord(key);
  const { defaults: _defaults, ...schema } = def;
  return NextResponse.json({ success: true, data: { schema, ...record } });
}

export async function PUT(req: Request, { params }: Params) {
  const key = await keyFrom(params);
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Request body must be JSON." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || !("data" in body)) {
    return NextResponse.json({ success: false, error: "Expected { data: ... }." }, { status: 400 });
  }

  try {
    const { data, note } = body as { data: unknown; note?: unknown };
    const result = await saveContent(key, data, await editorEmail(), typeof note === "string" && note.trim() ? note.trim().slice(0, 140) : "Published");
    revalidateFor(getDefinition(key)!);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const key = await keyFrom(params);
  try {
    await resetContent(key, await editorEmail());
    revalidateFor(getDefinition(key)!);
    return NextResponse.json({ success: true, data: await getContentRecord(key) });
  } catch (error) {
    return errorResponse(error);
  }
}
