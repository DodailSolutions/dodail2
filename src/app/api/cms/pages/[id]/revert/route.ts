import { NextResponse } from "next/server";
import { revertPageRevision } from "@/lib/cms/api";
import { revalidateCustomPage } from "@/lib/cms/publish";
import { editorEmail } from "@/lib/auth/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { revision_id } = body;
    if (!revision_id) {
      return NextResponse.json({ error: "revision_id is required" }, { status: 400 });
    }
    const reverted = await revertPageRevision(id, revision_id, await editorEmail());
    revalidateCustomPage(reverted?.slug);
    return NextResponse.json({ success: true, data: reverted });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
