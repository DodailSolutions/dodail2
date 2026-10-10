import { NextResponse } from "next/server";
import { getWorkflows, saveWorkflow } from "@/lib/automation/store";

export async function GET() {
  try {
    const workflows = getWorkflows();
    return NextResponse.json({ success: true, data: workflows });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: "Workflow name is required" }, { status: 400 });
    }
    const saved = saveWorkflow(body);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
