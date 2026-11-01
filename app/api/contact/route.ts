import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ─── Validation helpers ─── */
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    /* ── 1. Parse & sanitise body ── */
    const body = await req.json();
    const name    = String(body.name    ?? "").trim();
    const email   = String(body.email   ?? "").trim();
    const phone   = String(body.phone   ?? "").trim();
    const service = String(body.service ?? "General enquiry").trim();
    const message = String(body.message ?? "").trim();

    /* ── 2. Input validation ── */
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please complete your name, email and project message." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    /* ── 3. Read env vars ── */
    const gmailUser = process.env.GMAIL_USER;   // e.g. vyrodigital04@gmail.com
    const gmailPass = process.env.GMAIL_PASS;   // Gmail App Password (16 chars)
    const toEmail   = process.env.CONTACT_TO ?? "vyrodigital04@gmail.com";

    /* If credentials are not configured, fail gracefully */
    if (!gmailUser || !gmailPass) {
      console.warn("[contact] GMAIL_USER / GMAIL_PASS not set — email not sent.");
      return NextResponse.json(
        {
          error:
            "Email delivery is not active yet. Please email vyrodigital04@gmail.com or reach us on WhatsApp.",
        },
        { status: 503 }
      );
    }

    /* ── 4. Build Nodemailer transporter (Gmail SMTP) ── */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    /* ── 5. Compose email ── */
    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#0b0b0b;padding:24px 32px;border-bottom:3px solid #c9a45c">
          <h1 style="color:#c9a45c;font-size:20px;margin:0">VYRO DIGITAL</h1>
          <p style="color:#888;margin:4px 0 0;font-size:13px">New website enquiry</p>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#555;width:140px;vertical-align:top;font-size:14px">Name</td>
                <td style="padding:8px 0;font-weight:600;font-size:14px">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555;vertical-align:top;font-size:14px">Email</td>
                <td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#c9a45c">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#555;vertical-align:top;font-size:14px">Phone / WhatsApp</td>
                <td style="padding:8px 0;font-size:14px">${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#555;vertical-align:top;font-size:14px">Service</td>
                <td style="padding:8px 0;font-size:14px">${service}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0"/>
          <p style="color:#555;font-size:13px;margin-bottom:8px">Project details</p>
          <p style="white-space:pre-wrap;font-size:15px;line-height:1.6">${message}</p>
        </div>
        <div style="background:#f7f7f7;padding:16px 32px;font-size:12px;color:#888">
          Sent via the VYRO Digital website contact form
        </div>
      </div>
    `;

    const text = [
      "NEW WEBSITE ENQUIRY — VYRO DIGITAL",
      "",
      `Name:             ${name}`,
      `Email:            ${email}`,
      `Phone/WhatsApp:   ${phone || "—"}`,
      `Service:          ${service}`,
      "",
      "Project details:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from:     `"VYRO Digital Website" <${gmailUser}>`,
      to:       toEmail,
      replyTo:  email,
      subject:  `New enquiry — ${service} | ${name}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong while sending your enquiry. Please try again or reach out directly." },
      { status: 500 }
    );
  }
}
