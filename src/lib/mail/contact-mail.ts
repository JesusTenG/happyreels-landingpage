import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

import type { Locale } from "@/i18n/config";

import type { ContactMailConfig } from "./contact-env";
import { escapeHtml } from "./escape-html";
import type { ValidatedContactPayload } from "./contact-validation";

type SendContext = Readonly<{
  config: ContactMailConfig;
  payload: ValidatedContactPayload;
  userAgent: string | null;
}>;

function createTransport(config: ContactMailConfig): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function formatTimestamp(locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date());
}

function operatorSubject(locale: Locale): string {
  return locale === "en"
    ? "New contact request via the website"
    : "Neue Kontaktanfrage über die Website";
}

function autoReplySubject(locale: Locale): string {
  return locale === "en"
    ? "Thanks for your message"
    : "Danke für deine Nachricht";
}

function buildOperatorText(ctx: SendContext): string {
  const { payload, userAgent } = ctx;
  const lines = [
    `Name: ${payload.name}`,
    `E-Mail: ${payload.email}`,
    "",
    "Nachricht:",
    payload.message,
    "",
    `Zeitpunkt: ${formatTimestamp(payload.locale)}`,
    `Sprache: ${payload.locale.toUpperCase()}`,
  ];

  if (payload.pageUrl) {
    lines.push(`Seite: ${payload.pageUrl}`);
  }

  if (userAgent) {
    lines.push(`User-Agent: ${userAgent}`);
  }

  return lines.join("\n");
}

function buildOperatorHtml(ctx: SendContext): string {
  const { payload, userAgent } = ctx;
  const rows = [
    ["Name", payload.name],
    ["E-Mail", payload.email],
    ["Nachricht", payload.message],
    ["Zeitpunkt", formatTimestamp(payload.locale)],
    ["Sprache", payload.locale.toUpperCase()],
  ];

  if (payload.pageUrl) {
    rows.push(["Seite", payload.pageUrl]);
  }

  if (userAgent) {
    rows.push(["User-Agent", userAgent]);
  }

  const bodyRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:6px 12px 6px 0;font-family:sans-serif;font-size:14px;color:#666;">${escapeHtml(label)}</th><td style="padding:6px 0;font-family:sans-serif;font-size:14px;color:#111;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<!DOCTYPE html><html><body style="margin:0;padding:16px;background:#f5f5f5;"><table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fff;border:1px solid #e5e5e5;border-radius:8px;"><tbody>${bodyRows}</tbody></table></body></html>`;
}

function buildAutoReplyText(ctx: SendContext): string {
  const { payload, config } = ctx;

  if (payload.locale === "en") {
    return [
      `Hi ${payload.name},`,
      "",
      "thank you for your message. Your request has been received and will be reviewed as soon as possible.",
      "",
      "Your message:",
      `"${payload.message}"`,
      "",
      "Best regards",
      config.siteName,
    ].join("\n");
  }

  return [
    `Hallo ${payload.name},`,
    "",
    "vielen Dank für deine Nachricht. Deine Anfrage ist angekommen und wird so schnell wie möglich geprüft.",
    "",
    "Zur Übersicht deine Nachricht:",
    `"${payload.message}"`,
    "",
    "Viele Grüße",
    config.siteName,
  ].join("\n");
}

function buildAutoReplyHtml(ctx: SendContext): string {
  const text = buildAutoReplyText(ctx);
  return `<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:sans-serif;font-size:15px;line-height:1.55;color:#111;white-space:pre-wrap;">${escapeHtml(text)}</body></html>`;
}

export async function sendOperatorContactMail(ctx: SendContext): Promise<void> {
  const transport = createTransport(ctx.config);

  await transport.sendMail({
    from: ctx.config.mailFrom,
    to: ctx.config.mailTo,
    replyTo: ctx.payload.email,
    subject: operatorSubject(ctx.payload.locale),
    text: buildOperatorText(ctx),
    html: buildOperatorHtml(ctx),
  });
}

export async function sendContactAutoReply(ctx: SendContext): Promise<void> {
  const transport = createTransport(ctx.config);

  await transport.sendMail({
    from: ctx.config.mailFrom,
    to: ctx.payload.email,
    replyTo: ctx.config.mailTo,
    subject: autoReplySubject(ctx.payload.locale),
    text: buildAutoReplyText(ctx),
    html: buildAutoReplyHtml(ctx),
  });
}
