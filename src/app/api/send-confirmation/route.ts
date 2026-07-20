import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP configuration');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

async function sendMail(transporter: nodemailer.Transporter, options: nodemailer.SendMailOptions) {
  return transporter.sendMail(options);
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

    const recipient = process.env.CONTACT_TO_EMAIL;
    if (!recipient) {
      console.error('Missing CONTACT_TO_EMAIL');
      return NextResponse.json({ error: 'E-Mail-Service nicht konfiguriert.' }, { status: 500 });
    }

    const transporter = buildTransporter();
    const sender = process.env.SMTP_FROM || process.env.SMTP_USER || 'kontakt@tf-m.de';

    await Promise.all([
      sendMail(transporter, {
        from: sender,
        to: [recipient],
        replyTo: email,
        subject: `Neue Anfrage von ${name}`,
        text: `Neue Kontaktanfrage\n\nName: ${name}\nE-Mail: ${email}\nNachricht:\n${message}`,
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
      sendMail(transporter, {
        from: sender,
        to: [email],
        replyTo: recipient,
        subject: 'Danke für deine Anfrage – TFM Montage',
        text: `Hallo ${name},\nich habe deine Nachricht erhalten und melde mich schnellstmöglich bei dir.\n\nBis bald,\nThomas Frenzel\nTFM Montage & Handwerk, Böblingen`,
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
    return NextResponse.json({ error: message.includes('Missing SMTP configuration') ? 'E-Mail-Service nicht konfiguriert.' : 'E-Mail konnte nicht gesendet werden.' }, { status: 500 });
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
