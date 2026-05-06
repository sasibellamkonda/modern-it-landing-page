import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "bellamkonda.skumar@gmail.com";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }
  const resend = new Resend(apiKey);

  const { name, email, company, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "PrakCorp Contact Form <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: email,
    subject: `New inquiry from ${name}${company ? ` at ${company}` : ""}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
        <h2 style="color:#3b82f6;margin-bottom:4px">New Contact Form Submission</h2>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin-bottom:20px"/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Message:</strong></p>
        <blockquote style="border-left:3px solid #3b82f6;margin:0;padding:12px 16px;background:#f8fafc;border-radius:0 8px 8px 0">
          ${message.replace(/\n/g, "<br/>")}
        </blockquote>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
