import { NextResponse } from "next/server";
import { getExecutions, getWorkflowById } from "@/lib/automation/store";
import { runWorkflow } from "@/lib/automation/engine";

export async function GET() {
  try {
    const executions = getExecutions();
    return NextResponse.json({ success: true, data: executions });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { execution_id } = body;

    const executions = getExecutions();
    const existing = executions.find((e) => e.id === execution_id);

    if (!existing) {
      return NextResponse.json({ error: `Execution with id ${execution_id} not found` }, { status: 404 });
    }

    const workflow = getWorkflowById(existing.workflow_id);
    if (!workflow) {
      return NextResponse.json({ error: "Associated workflow definition no longer exists" }, { status: 400 });
    }

    // Replay with new execution ID and explicit user stamp
    const replayExecution = await runWorkflow(
      workflow,
      existing.node_logs[0]?.input_data || {},
      {
        isDryRun: existing.is_dry_run,
        user: "replay@dodail.com",
        idempotencyKey: `replay-${Date.now()}-${existing.idempotency_key}`,
      }
    );

    return NextResponse.json({
      success: true,
      data: replayExecution,
      message: "Workflow execution replayed successfully.",
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
