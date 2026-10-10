import { NextResponse } from "next/server";
import { getWorkflowById } from "@/lib/automation/store";
import { runWorkflow } from "@/lib/automation/engine";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const workflow = getWorkflowById(id);

    if (!workflow) {
      return NextResponse.json({ error: `Workflow with id ${id} not found` }, { status: 404 });
    }

    const body = await req.json().catch(() => ({}));
    const isDryRun = !!body.is_dry_run;
    const payload = body.payload || {
      topic: "Automated Lead Routing for Hyderabad Tech Startups",
      audience: "Founders & Operations Leaders",
      industry: "B2B Software",
      intent: "Commercial",
      target_keyword: "automated lead routing Hyderabad B2B",
      priority: "High",
    };

    const execution = await runWorkflow(workflow, payload, {
      isDryRun,
      user: body.user || "admin@dodail.com",
    });

    return NextResponse.json({
      success: true,
      data: execution,
      message: isDryRun
        ? "Workflow completed dry-run simulation successfully. No live records modified."
        : "Workflow executed successfully.",
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
