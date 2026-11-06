import { NextResponse } from "next/server";

export const runtime = "nodejs";

/* ─── In-Memory Rate Limiting (5 requests per IP per 10 minutes) ─── */
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  // Prune expired entries if map grows large
  if (rateLimitMap.size > 1000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now > v.resetAt) rateLimitMap.delete(k);
    }
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

/* ─── CORS Headers ─── */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/* ─── Validation & Sanitisation Helpers ─── */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function isPlaceholderApiKey(val: string | undefined): boolean {
  if (!val) return true;
  const lower = val.toLowerCase().trim();
  return (
    lower === "" ||
    lower.startsWith("your_") ||
    lower.includes("placeholder") ||
    lower.includes("example") ||
    lower === "re_123456789"
  );
}

/* ─── POST /api/contact ─── */
export async function POST(req: Request) {
  try {
    /* 1. Extract Client IP for Rate Limiting */
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait a few minutes before submitting again or email us directly at vyrodigital04@gmail.com.",
        },
        { status: 429, headers: corsHeaders }
      );
    }

    /* 2. Parse JSON Body */
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400, headers: corsHeaders }
      );
    }

    /* 3. Honeypot check: If filled, silently return { ok: true } */
    const website = String(body.website ?? "").trim();
    if (website) {
      return NextResponse.json({ ok: true }, { status: 200, headers: corsHeaders });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const service = String(body.service ?? "Website development").trim();
    const message = String(body.message ?? "").trim();

    /* 4. Field Limits and Validation */
    if (!name) {
      return NextResponse.json(
        { error: "Full Name is required." },
        { status: 400, headers: corsHeaders }
      );
    }
    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or fewer." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400, headers: corsHeaders }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400, headers: corsHeaders }
      );
    }
    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email must be 254 characters or fewer." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (phone.length > 30) {
      return NextResponse.json(
        { error: "Phone number must be 30 characters or fewer." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (service.length > 100) {
      return NextResponse.json(
        { error: "Service must be 100 characters or fewer." },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Project details must be at least 10 characters." },
        { status: 400, headers: corsHeaders }
      );
    }
    if (message.length > 3000) {
      return NextResponse.json(
        { error: "Project details must be 3000 characters or fewer." },
        { status: 400, headers: corsHeaders }
      );
    }

    /* 5. Read & Verify Resend API Key */
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const contactTo = process.env.CONTACT_TO?.trim() || "vyrodigital04@gmail.com";

    if (!resendApiKey || isPlaceholderApiKey(resendApiKey)) {
      console.warn(
        `[contact-api] RESEND_API_KEY is not configured or placeholder detected.`
      );
      return NextResponse.json(
        {
          error:
            "Email service is temporarily unavailable. Please contact vyrodigital04@gmail.com directly.",
        },
        { status: 503, headers: corsHeaders }
      );
    }

    /* 6. Strip newlines from name and service for email header safety */
    const cleanName = name.replace(/[\r\n]+/g, " ");
    const cleanService = service.replace(/[\r\n]+/g, " ");

    /* 7. Timestamp & Escaped HTML Rendering */
    const now = new Date();
    const submissionDate = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "medium",
      timeZone: "Asia/Kolkata",
    }).format(now);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
    const safeTimestamp = escapeHtml(`${submissionDate} (IST)`);

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New VYRO Digital Enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#070707;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ede8df;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#070707;padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:600px;background-color:#111111;border:1px solid #222222;border-radius:4px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.6);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#0b0b0b;padding:28px 36px;border-bottom:2px solid #c9a45c;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <div style="font-size:20px;font-weight:700;letter-spacing:3px;color:#c9a45c;text-transform:uppercase;">VYRO DIGITAL</div>
                    <div style="font-size:12px;letter-spacing:1px;color:#8f887e;margin-top:4px;text-transform:uppercase;">New Website Enquiry</div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;padding:5px 12px;background:rgba(201,164,92,0.12);border:1px solid #c9a45c;color:#c9a45c;font-size:11px;font-weight:600;letter-spacing:1px;border-radius:2px;text-transform:uppercase;">
                      ${safeService}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Visitor Info -->
          <tr>
            <td style="padding:32px 36px 20px;">
              <h2 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c9a45c;margin:0 0 16px;">Visitor Information</h2>
              <table role="presentation" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#8f887e;font-size:13px;width:140px;">Full Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#ede8df;font-size:14px;font-weight:600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#8f887e;font-size:13px;">Email Address</td>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#ede8df;font-size:14px;">
                    <a href="mailto:${safeEmail}" style="color:#c9a45c;text-decoration:none;font-weight:600;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#8f887e;font-size:13px;">Phone / WhatsApp</td>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#ede8df;font-size:14px;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#8f887e;font-size:13px;">Service Required</td>
                  <td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#c9a45c;font-size:14px;font-weight:600;">${safeService}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#8f887e;font-size:13px;">Submission Time</td>
                  <td style="padding:10px 0;color:#ede8df;font-size:13px;">${safeTimestamp}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Project Details Box -->
          <tr>
            <td style="padding:0 36px 28px;">
              <h2 style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#c9a45c;margin:16px 0 12px;">Project Details</h2>
              <div style="background-color:#181818;border:1px solid #282828;border-left:3px solid #c9a45c;padding:18px 20px;border-radius:2px;font-size:14px;line-height:1.7;color:#f0ede6;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- Quick Action CTA -->
          <tr>
            <td style="padding:0 36px 32px;" align="center">
              <a href="mailto:${safeEmail}?subject=Re:%20VYRO%20Digital%20Enquiry%20-%20${encodeURIComponent(cleanService)}" 
                 style="display:inline-block;background-color:#c9a45c;color:#0b0b0b;padding:12px 26px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;border-radius:2px;">
                Reply to ${safeName} &rarr;
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#0b0b0b;padding:20px 36px;border-top:1px solid #1f1f1f;font-size:11px;color:#777777;text-align:center;line-height:1.6;">
              Dispatched automatically via Resend Email API from VYRO Digital website contact form.<br/>
              Recipient: ${contactTo}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const text = [
      "==================================================",
      "NEW WEBSITE ENQUIRY — VYRO DIGITAL",
      "==================================================",
      "",
      `Full Name:          ${name}`,
      `Email Address:      ${email}`,
      `Phone / WhatsApp:   ${phone || "Not provided"}`,
      `Service Required:   ${service}`,
      `Submission Time:    ${submissionDate} (IST)`,
      "",
      "--------------------------------------------------",
      "PROJECT DETAILS:",
      "--------------------------------------------------",
      message,
      "",
      "==================================================",
      "Dispatched automatically via Resend Email API from VYRO Digital",
      "==================================================",
    ].join("\n");

    /* 8. Send Email via Resend HTTPS API */
    const resendPayload = {
      from: "VYRO Digital <onboarding@resend.dev>",
      to: [contactTo],
      reply_to: email,
      subject: `New Enquiry — ${cleanService} | ${cleanName}`,
      html,
      text,
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    const resendData = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok) {
      console.error("[contact-api] Resend API error:", {
        status: resendResponse.status,
        data: resendData,
      });

      const errorMessage =
        resendData?.message ||
        "Unable to send enquiry through mail provider. Please check configuration or try again.";

      return NextResponse.json(
        { error: errorMessage },
        {
          status:
            resendResponse.status >= 400 && resendResponse.status < 600
              ? resendResponse.status
              : 502,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Thank you — we'll reply within 24 hours.",
        id: resendData?.id,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("[contact-api] Unexpected dispatch error:", {
      message: err?.message || String(err),
    });
    return NextResponse.json(
      {
        error:
          "Unable to send enquiry due to a server error. Please try again or reach out directly at vyrodigital04@gmail.com.",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
