import { NextResponse } from "next/server";

/**
 * Confidential assessment booking endpoint.
 *
 * Collects only what is needed to contact the person (Brand Guidelines 12.2 · 05, NDPA 2023).
 * Currently validates and logs. Before launch, connect delivery to the admissions team,
 * e.g. email via Resend/Postmark/SMTP, or a secure admin dashboard, using env credentials.
 * Never write booking details to public logs in production.
 */
export async function POST(req: Request) {
  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const str = (k: string) => String(d[k] ?? "").trim().slice(0, 1000);
  const name = str("name");
  const phone = str("phone");
  const date = str("date");
  const contactBy = str("contactBy");
  const email = str("email");

  if (!name || !/^[+\d][\d\s-]{6,}$/.test(phone) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || d.consent !== "on") {
    return NextResponse.json({ error: "Please add a name, a valid phone number, a preferred date, and tick the privacy box." }, { status: 422 });
  }
  if (contactBy === "Email" && !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please add a valid email address, or choose phone or WhatsApp." }, { status: 422 });
  }

  const booking = {
    who: str("who"), name, phone, email, contactBy, date, time: str("time"), notes: str("notes"),
    receivedAt: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") console.log("[booking]", booking);
  // TODO: deliver `booking` to the admissions team securely.

  return NextResponse.json({ ok: true });
}
