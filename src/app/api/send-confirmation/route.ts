import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const _resendPromise: Promise<import('resend').Resend> | null = null;

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('Missing API key');
  return Promise.resolve(new Resend(key));
}

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.request || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
      console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL');
      return NextResponse.json({ error: 'E-Mail-Service nicht konfiguriert.' }, { status: 500 });
    }

    const resend = await getResendClient();
    const sender = process.env.RESEND_FROM || 'TFM Montage <kontakt@tf-m.de>';
    const recipient = process.env.CONTACT_TO_EMAIL;

    await Promise.all([
      resend.emails.send({
        from: sender,
        to: [recipient],
        replyTo: email,
        subject: `Neue Anfrage von ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #fff; background-color: #212121; padding: 24px; border-radius: 12px;">
            <h2 style="margin-top: 0; color: #86aaa6;">Neue Kontaktanfrage</h2>
            <p><strong style="color: #fff;">Name:</strong> <span style="color: #cfcfc7;">${escapeHtml(name)}</span></p>
            <p><strong style="color: #fff;">E-Mail:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #86aaa6;">${escapeHtml(email)}</a></p>
            <p><strong style="color: #fff;">Nachricht:</strong></p>
            <div style="background: #2a2a2a; padding: 14px; border-radius: 8px; color: #cfcfc7; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
        `
      }),
      resend.emails.send({
        from: sender,
        to: [email],
        replyTo: recipient,
        subject: 'Danke für deine Anfrage – TFM Montage',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #fff; background-color: #212121; padding: 24px; border-radius: 12px;">
            <h2 style="margin-top: 0; color: #86aaa6;">Danke für deine Anfrage</h2>
            <p>Hallo ${escapeHtml(name)},</p>
            <p>ich habe deine Nachricht erhalten und melde mich schnellstmöglich bei dir.</p>
            <p style="margin-top: 16px;">Bis bald,<br/>Thomas Frenzel<br/>TFM Montage & Handwerk, Böblingen</p>
          </div>
        `
      })
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('send-confirmation error', error);
    const message = error instanceof Error ? error.message : 'E-Mail konnte nicht gesendet werden.';
    return NextResponse.json({ error: message.includes('Missing API key') ? 'E-Mail-Service nicht konfiguriert.' : 'E-Mail konnte nicht gesendet werden.' }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
