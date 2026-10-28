import { NextResponse } from "next/server";
import { sanitizeUserMessage } from "@/lib/ai/tools";
import { processGitaChat } from "@/lib/ai/gita";

interface ChatRequestBody {
  session_id?: string;
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

export async function POST(req: Request) {
  try {
    const body: ChatRequestBody = await req.json();

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const { safeText, isInjectionSuspected } = sanitizeUserMessage(body.message);

    // Defense against Prompt Injection
    if (isInjectionSuspected) {
      return NextResponse.json({
        reply: "Hello! I am Gita from Dodail Solutions. I can only assist with legitimate questions regarding our creative engineering, AI workflows, and consultation bookings. How can I help your business grow today?",
        tool_executed: null,
        session_id: body.session_id || `session-${Date.now()}`,
      });
    }

    const result = await processGitaChat({
      sessionId: body.session_id,
      message: safeText,
      history: body.history,
    });

    return NextResponse.json({
      reply: result.reply,
      session_id: result.sessionId,
      tool_executed: result.toolExecuted,
      slots_available: result.slotsAvailable,
      booking_confirmed: result.bookingConfirmed,
    });
  } catch (error) {
    console.error("[api/ai/chat] Execution error:", error);
    return NextResponse.json(
      {
        reply: "I am having trouble connecting to my service network right now, but our team is on standby. Please email us directly at info@dodail.com or call +91 99664 00235.",
        error: "Internal error processing conversation",
      },
      { status: 500 }
    );
  }
}
