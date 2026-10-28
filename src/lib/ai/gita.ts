import { retrieveRelevantKnowledge } from "./rag";
import { getCalendarAvailability, bookCalendarAppointment, CalendarSlot } from "../integrations/google-calendar";
import { appendLeadToSheet, readLeadStatusFromSheet } from "../integrations/google-sheets";
import { saveSession, getSession } from "./store";
import { ConversationSession, ChatMessage } from "./types";

export interface GitaResponse {
  reply: string;
  sessionId: string;
  toolExecuted: string | null;
  slotsAvailable?: CalendarSlot[];
  bookingConfirmed?: {
    summary: string;
    startTime: string;
    meetLink?: string;
  };
}

const GITA_SYSTEM_PROMPT = `You are Gita, a warm, articulate, and consultative Senior Solutions Specialist at Dodail Solutions Pvt Ltd in Hyderabad, India.
Tagline: "Think Growth. Think Dodail."
Positioning: Dodail designs, builds and improves the digital systems businesses use to grow — from websites and e-commerce to custom software, AI automation, SEO and digital marketing.
Brand Concept: DODAIL = Design-Oriented Development & AI-Led Solutions.

Services:
1. AI Automation & Workflows: Lead routing, CRM workflows, WhatsApp Cloud API integrations, reducing manual data entry.
2. Custom Software & SaaS: Web applications, client portals, internal dashboards, and SaaS products built with Next.js, React, Node.js, and PostgreSQL.
3. Website Design & Development: Fast, mobile-first business websites with conversion-focused UX and technical SEO.
4. E-Commerce Development: Shopify, WooCommerce, and custom stores with payment gateway integrations.
5. Digital Marketing, SEO & GEO: Generative Engine Optimization (GEO) for AI search engines (ChatGPT, Perplexity, Google AI Overviews), technical SEO, and performance ads.
6. Branding & UI/UX Design: Visual identity systems, logo guidelines, packaging, and digital product design.

Product Portfolio Knowledge:
• BillBooky (Available / Beta): Dodail-associated billing and business tool at https://billbooky.dodail.com/.
• Dodail AI Social (In Development): Planned social media management & AI content workflow platform.
• TinyRide (Concept / Prototype): School transport coordination concept.
• Manufacturing OS (Concept / Custom Capability): Modular manufacturing workflow platform.
• Rentcot (Delivered Client Project): Resort & farmhouse booking portal (https://www.rentcot.in/).

Strict Grounding Rules:
- Speak in natural, human, professional English with empathy and high business acumen.
- Never use robotic cliches like "As an AI model" or generic filler buzzwords.
- Never guarantee #1 rankings, guaranteed revenue, or guaranteed lead numbers. Be transparent: success depends on market, product, and consistent execution.
- GEO strictly means Generative Engine Optimization (optimizing for AI search engines like ChatGPT and Perplexity).
- If asked about pricing: Starter automation workflows typically range from ₹75,000 to ₹1,50,000 INR; custom websites and software builds are milestone-scoped after understanding requirements.
- Office: Hyderabad, Telangana, India. Phone: +91 99664 00235 | Email: info@dodail.com.
- Always encourage scheduling a 15-30 minute strategy consultation call with our solutions team.`;

/**
 * Core processing function for incoming chat messages with Gita.
 */
export async function processGitaChat(params: {
  sessionId?: string;
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}): Promise<GitaResponse> {
  const sessionId = params.sessionId || `session-${Date.now()}`;
  const userText = params.message.trim();
  const lower = userText.toLowerCase();

  // 1. Fetch or initialize persistent session
  let session = await getSession(sessionId);
  if (!session) {
    session = {
      id: sessionId,
      messages: [],
      qualification_state: {},
      consent: { marketing_consent: true, terms_agreed: true, timestamp: new Date().toISOString() },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  // Record user message
  const userMsg: ChatMessage = {
    id: `msg-u-${Date.now()}`,
    role: "user",
    content: userText,
    timestamp: new Date().toISOString(),
  };
  session.messages.push(userMsg);

  // 2. Extract Lead Attributes (Name, Email, Phone, Company, Problem)
  const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = userText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);

  if (emailMatch) {
    session.qualification_state.email = emailMatch[0];
  }
  if (phoneMatch) {
    session.qualification_state.phone = phoneMatch[0];
  }

  // Name extraction heuristic
  const namePatterns = [
    /(?:my name is|i am|this is|i'm|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$/,
  ];
  for (const pattern of namePatterns) {
    const match = userText.match(pattern);
    if (match && match[1] && !session.qualification_state.name) {
      session.qualification_state.name = match[1].trim();
      break;
    }
  }

  // Problem / Need extraction
  if (userText.length > 30 && !session.qualification_state.problem) {
    session.qualification_state.problem = userText;
  }

  // Identify service category
  if (lower.includes("seo") || lower.includes("marketing") || lower.includes("ads") || lower.includes("traffic")) {
    session.qualification_state.recommended_solution = "Digital Marketing & AI Search";
  } else if (lower.includes("web") || lower.includes("site") || lower.includes("next.js") || lower.includes("react") || lower.includes("software")) {
    session.qualification_state.recommended_solution = "Web & Application Development";
  } else if (lower.includes("app") || lower.includes("mobile") || lower.includes("ios") || lower.includes("android")) {
    session.qualification_state.recommended_solution = "Mobile App Development";
  } else if (lower.includes("brand") || lower.includes("logo") || lower.includes("identity")) {
    session.qualification_state.recommended_solution = "Branding & Visual Identity";
  } else if (lower.includes("strategy") || lower.includes("growth") || lower.includes("gtm")) {
    session.qualification_state.recommended_solution = "Marketing & Strategy Development";
  }

  let reply = "";
  let toolExecuted: string | null = null;
  let slotsAvailable: CalendarSlot[] | undefined;
  let bookingConfirmed: GitaResponse["bookingConfirmed"] | undefined;

  // 3. INTENT A: Check Status of Previous Lead / Inquiry
  if (lower.includes("status") || lower.includes("my response") || lower.includes("previous inquiry") || lower.includes("check update")) {
    const queryEmail = session.qualification_state.email || (emailMatch ? emailMatch[0] : null);
    if (queryEmail) {
      const statusData = await readLeadStatusFromSheet(queryEmail);
      toolExecuted = "readLeadStatusFromSheet";
      if (statusData) {
        reply = `I checked our system for ${queryEmail}. Your inquiry status is currently "${statusData.status || "Under Review"}". ` +
          (statusData.adminNotes ? `Our team left this update note: "${statusData.adminNotes}". ` : "") +
          (statusData.bookedSlot ? `Your consultation is scheduled for: ${statusData.bookedSlot}. ` : "") +
          `Is there anything specific you would like me to update or forward to the team?`;
      } else {
        reply = `I looked for records associated with ${queryEmail}, but couldn't find an existing entry yet. Would you like me to register your project requirements so our solutions team can follow up right away?`;
      }
    } else {
      reply = `I'd be happy to check your inquiry status on our records! Could you please share the email address you previously used with Dodail?`;
    }
  }

  // 4. INTENT B: Book an Appointment (Calendar Booking Execution)
  else if (
    (lower.includes("book") || lower.includes("schedule") || lower.includes("confirm")) &&
    (lower.includes("slot") || lower.includes("appointment") || lower.includes("call") || lower.includes("tomorrow") || lower.includes("pm") || lower.includes("am"))
  ) {
    const clientName = session.qualification_state.name || "Client";
    const clientEmail = session.qualification_state.email;

    if (!clientEmail) {
      // Prompt for email first before locking booking
      reply = `I'd love to lock that consultation slot in for you! Could you please share your preferred email address so I can send the Google Calendar invitation and Google Meet link directly to your inbox?`;
    } else {
      toolExecuted = "bookCalendarAppointment";
      const bookRes = await bookCalendarAppointment({
        name: clientName,
        email: clientEmail,
        phone: session.qualification_state.phone,
        notes: session.qualification_state.problem || "Dodail Strategy Discovery Session",
      });

      bookingConfirmed = {
        summary: bookRes.summary,
        startTime: bookRes.startTime,
        meetLink: bookRes.meetLink,
      };

      // Also record into Google Sheets
      await appendLeadToSheet({
        sessionId,
        name: clientName,
        email: clientEmail,
        phone: session.qualification_state.phone,
        problem: session.qualification_state.problem,
        service: session.qualification_state.recommended_solution,
        bookedSlot: new Date(bookRes.startTime).toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        status: "Consultation Booked",
      });

      reply = `Wonderful, ${clientName}! I've booked your discovery consultation with our senior solutions team for ${new Date(bookRes.startTime).toLocaleString("en-US", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" })} IST. 

A Google Calendar invite and Google Meet link (${bookRes.meetLink}) have been generated for ${clientEmail}. 

Is there any specific documentation or background detail about your business you'd like me to brief our team on before we meet?`;
    }
  }

  // 5. INTENT C: Check Calendar Openings / Available Times
  else if (lower.includes("available") || lower.includes("timing") || lower.includes("slots") || lower.includes("when are you free") || lower.includes("schedule a call")) {
    toolExecuted = "getCalendarAvailability";
    const avail = await getCalendarAvailability();
    slotsAvailable = avail.slots;

    const formattedSlots = avail.slots.slice(0, 4).map((s) => `• ${s.display}`).join("\n");
    reply = `Our senior engineering and strategy team conducts 30-minute discovery consultations Monday through Saturday. Here are a few open slots coming up:

${formattedSlots}

Which of these times works best for you? Or if you have a different day in mind, let me know along with your email and I will reserve it on our calendar!`;
  }

  // 6. INTENT D: Human Escalation / Direct Contact
  else if (lower.includes("human") || lower.includes("call me") || lower.includes("speak to") || lower.includes("founder") || lower.includes("phone number")) {
    toolExecuted = "requestHumanHandoff";
    reply = `I would be delighted to connect you directly with our leadership team! 

You can reach our Hyderabad headquarters at:
• **Phone / WhatsApp:** +91 99664 00235
• **General Inquiries:** info@dodail.com
• **New Business:** marketing@dodail.in
• **Office:** Hirkani Tower, Maruthi Nagar, Hyderabad, India

If you leave your phone number or email here, I can also have one of our directors reach out to you within 24 business hours.`;
  }

  // 7. INTENT E: Grounded RAG Knowledge Query & Lead Capture
  else {
    const relevantDocs = await retrieveRelevantKnowledge(userText, 3);
    toolExecuted = "retrieveRelevantKnowledge";

    // If email provided during inquiry, log to Google Sheets
    if (session.qualification_state.email) {
      await appendLeadToSheet({
        sessionId,
        name: session.qualification_state.name || "Website Visitor",
        email: session.qualification_state.email,
        phone: session.qualification_state.phone,
        problem: session.qualification_state.problem || userText,
        service: session.qualification_state.recommended_solution,
        status: "Qualified Lead",
      });
    }

    // Contextual intelligent response grounded in Dodail's knowledge
    if (lower.includes("guarantee") && (lower.includes("rank") || lower.includes("lead") || lower.includes("revenue") || lower.includes("seo"))) {
      reply = `No, Dodail does not make guaranteed ranking, lead, or revenue claims. Search algorithms and ad platforms depend on shifting market competition and user demand. What we do guarantee is meticulous technical execution, conversion-focused architecture, transparent reporting, and continuous data-backed optimization. Would you like to review how we structure our growth roadmaps?`;
    } else if (lower.includes("billbooky")) {
      reply = `BillBooky is a Dodail-associated billing and business management tool (available in beta at https://billbooky.dodail.com/). It helps businesses create invoices, manage client billing, and track payments seamlessly. Are you looking to integrate billing into your custom workflow?`;
    } else if (lower.includes("tinyride")) {
      reply = `TinyRide is currently an internal prototype and concept for school transport coordination between parents, drivers, and schools. It is not currently a publicly launched application. If you have a custom mobile fleet or logistics requirement, we can engineer a tailored mobile app for your operations.`;
    } else if (lower.includes("ai social") || lower.includes("dodail social")) {
      reply = `Dodail AI Social is our upcoming social media operations platform, currently in active internal development. It features a client approval calendar, AI-assisted content drafting, and multi-channel publishing workflows. Would you like to be notified when it opens for beta access?`;
    } else if (lower.includes("rentcot")) {
      reply = `Rentcot (https://www.rentcot.in/) is a resort, farmhouse, and camping booking portal designed and engineered by Dodail Solutions. We built the marketplace interface, booking workflows, and mobile experience. Would you like to build a similar booking or marketplace platform?`;
    } else if (lower.includes("price") || lower.includes("cost") || lower.includes("charge") || lower.includes("fee")) {
      reply = `At Dodail, our pricing is transparent and tied directly to project scope and business ROI. 
For instance:
• **AI & Automation Pipelines:** Starter automated workflows typically range between ₹75,000 to ₹1,50,000 INR.
• **Web & Application Engineering:** Custom portals and SaaS builds are scoped based on architecture, UX workflows, and integrations.
• **Growth & Marketing Retainers:** Tailored around your acquisition targets.

We'd love to understand your specific requirements so we can give you an exact roadmap. What kind of project or workflow are you looking to build?`;
    } else if (lower.includes("service") || lower.includes("what do you do") || lower.includes("who are you") || lower.includes("capabilities")) {
      reply = `Dodail Solutions is an AI-powered creative and technology agency based in Hyderabad. We partner with ambitious brands across India, the UAE, and the USA across 5 core pillars:

1. **Digital Marketing:** SEO, GEO (AI search visibility for ChatGPT/Google AI), performance ads, and high-converting content.
2. **Web & App Development:** Ultra-fast Next.js/React web platforms, custom dashboards, Shopify, and enterprise systems.
3. **Mobile App Development:** iOS and Android apps built with Flutter and React Native.
4. **Branding:** Visual identity, logo design systems, and packaging.
5. **Marketing & Strategy:** GTM planning, conversion rate optimization, and CMO-as-a-Service.

Which of these areas are you currently looking to elevate?`;
    } else if (lower.includes("timeline") || lower.includes("how long") || lower.includes("days") || lower.includes("weeks")) {
      reply = `Our delivery timelines depend on project depth:
• **Automations & AI Lead Engines:** Typically 7 to 14 business days from kickoff.
• **Brand Identities & Websites:** Usually 3 to 6 weeks for complete discovery, UI/UX design, and deployment.
• **Enterprise Custom Applications:** Delivered in iterative 2-week agile sprints.

Do you have a specific deadline or target launch date in mind?`;
    } else if (relevantDocs.length > 0) {
      const topDoc = relevantDocs[0];
      reply = `${topDoc.content}\n\nWould you like me to check open consultation slots with our engineering team, or would you like more details on this?`;
    } else {
      reply = `Hello! I'm Gita from Dodail Solutions. We help companies accelerate their growth through AI-led automation, high-performance web and mobile engineering, and strategic marketing. 

How can I help you today? Feel free to ask about our capabilities, delivery timelines, or schedule a quick 15-minute discovery consultation!`;
    }
  }

  // Record assistant response
  const assistantMsg: ChatMessage = {
    id: `msg-a-${Date.now()}`,
    role: "assistant",
    content: reply,
    timestamp: new Date().toISOString(),
  };
  session.messages.push(assistantMsg);

  // Save session state to persistence layer
  await saveSession(session);

  return {
    reply,
    sessionId,
    toolExecuted,
    slotsAvailable,
    bookingConfirmed,
  };
}
