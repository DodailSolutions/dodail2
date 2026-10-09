import { NextResponse } from "next/server";
import { sanitizeUserMessage, AI_SERVER_TOOLS } from "@/lib/ai/tools";
import { searchApprovedKnowledge } from "@/lib/ai/knowledge";

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

    const sessionId = body.session_id || `session-${Date.now()}`;
    const { safeText, isInjectionSuspected } = sanitizeUserMessage(body.message);

    // Defense Against Prompt Injection: Defuse immediately
    if (isInjectionSuspected) {
      return NextResponse.json({
        reply: "I am the Dodail Solutions AI Assistant. I can only assist with legitimate questions regarding our AI automation workflows, software engineering services, and consultation bookings. How can I help with your business operations?",
        tool_executed: null,
        session_id: sessionId,
      });
    }

    const lower = safeText.toLowerCase();

    // 1. Tool Call: Lead Capture Intent
    // If user provided email and name
    const emailMatch = safeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch && (lower.includes("name is") || lower.includes("i am") || lower.includes("my name") || lower.length < 120)) {
      const email = emailMatch[0];
      // Extract probable name
      let name = "Website Visitor";
      const nameRegex = /(?:my name is|i am|name:)\s+([A-Za-z\s]{2,30})/i;
      const match = safeText.match(nameRegex);
      if (match) {
        name = match[1].trim();
      }

      const toolRes = await AI_SERVER_TOOLS.create_crm_lead.execute(
        {
          name,
          email,
          problem: safeText,
        },
        sessionId
      );

      return NextResponse.json({
        reply: `Thank you, ${name}! I have recorded your contact details (${email}) in our system. A senior solutions architect from Dodail will review your operational requirements and reach out within 24 business hours. Would you also like to check available consultation time slots right now?`,
        tool_executed: "create_crm_lead",
        session_id: sessionId,
      });
    }

    // 2. Tool Call: Check Consultation Availability
    if (lower.includes("book") || lower.includes("slot") || lower.includes("consultation") || lower.includes("schedule") || lower.includes("available")) {
      const avail = await AI_SERVER_TOOLS.check_consultation_availability.execute({}, sessionId);
      return NextResponse.json({
        reply: `Our senior engineering team conducts 30-minute discovery consultations Monday through Saturday. Current open slots (IST) include: ${avail.slots.join(", ")}. You can secure your slot on our consultation page at /consultation or provide your email here and I will initiate the booking.`,
        tool_executed: "check_consultation_availability",
        session_id: sessionId,
      });
    }

    // 3. Tool Call: Human Handoff Request
    if (lower.includes("human") || lower.includes("person") || lower.includes("call me") || lower.includes("speak to someone") || lower.includes("agent")) {
      const handoff = await AI_SERVER_TOOLS.request_human_handoff.execute({ reason: "User requested live human contact" }, sessionId);
      return NextResponse.json({
        reply: `I would be happy to connect you with our human team. You can reach our Hyderabad engineering office directly at ${handoff.direct_channels.phone} or email us at ${handoff.direct_channels.email}. Alternatively, you can book an architecture call at /consultation.`,
        tool_executed: "request_human_handoff",
        session_id: sessionId,
      });
    }

    // 4. Knowledge Retrieval Tool & Guided Answer
    const knowledgeSnippets = searchApprovedKnowledge(safeText);

    // Context-sensitive helpful response based on verified knowledge
    let reply = "";
    if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("package")) {
      reply = "Our workflow automation projects are custom-scoped based on system complexity and connector requirements. Starter pipelines typically start from ₹75,000 to ₹1,50,000 INR. We never guess pricing without understanding your specific workflow—would you like to share what manual processes you are looking to automate?";
    } else if (lower.includes("how long") || lower.includes("timeline") || lower.includes("delivery") || lower.includes("days")) {
      reply = "Our typical implementation timeline for custom AI workflows and automation pipelines is 7 to 14 business days, following an initial 1-3 day discovery and specification phase. What is your preferred rollout timeframe?";
    } else if (lower.includes("dental") || lower.includes("clinic") || lower.includes("healthcare") || lower.includes("patient")) {
      reply = "For healthcare and dental practices, Dodail deploys intelligent patient inquiry answering, automated appointment reminder workflows, and WhatsApp confirmations to eliminate patient no-shows. Would you like to see how we structure this?";
    } else if (lower.includes("real estate") || lower.includes("property") || lower.includes("broker")) {
      reply = "For real estate firms, we deploy sub-60-second lead qualification agents that engage incoming property portal inquiries, qualify budget and timeline, and sync directly with your CRM. Which channels do you currently receive inquiries from?";
    } else if (lower.includes("service") || lower.includes("what do you do") || lower.includes("about dodail")) {
      reply = "Dodail Solutions architects dependable AI workflows, intelligent lead qualification engines, and high-performance custom web software. We help businesses eliminate repetitive manual operations. What operational bottleneck are you experiencing?";
    } else {
      reply = "I am the Dodail AI Assistant. I can help explain our AI automation platforms, lead management workflows, or assist you with booking a discovery session. If you have a specific inquiry, feel free to ask, or provide your email to connect directly with our engineering team.";
    }

    return NextResponse.json({
      reply,
      tool_executed: "search_knowledge",
      session_id: sessionId,
    });
  } catch (e: any) {
    return NextResponse.json({
      reply: "I am experiencing a momentary connection issue. You can reach our team directly at info@dodail.com or visit /consultation to book an architecture session.",
      error: e.message,
    }, { status: 200 });
  }
}
