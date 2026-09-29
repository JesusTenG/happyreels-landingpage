import type { ValidatedContactPayload } from "./contact-validation";
import { escapeHtml } from "./escape-html";

export const CONTACT_EMAIL_LOGO_CID = "happyreels-logo@happyreels.de";

const copy = {
  de: {
    subject: "Deine Nachricht ist bei uns angekommen",
    preheader: "Danke für deine Anfrage. Wir melden uns persönlich bei dir.",
    label: "ANFRAGE EINGEGANGEN",
    title: "Gute Ideen starten\nmit einem Hallo.",
    greeting: "Hi",
    intro: "Danke, dass du dich bei uns meldest! Deine Nachricht ist angekommen. Wir freuen uns darauf, mehr über dich und dein Projekt zu erfahren.",
    nextTitle: "So geht’s weiter",
    next: "Wir schauen uns deine Anfrage an und melden uns persönlich bei dir, um deine Ideen und die nächsten Schritte zu besprechen.",
    messageTitle: "Deine Nachricht",
    replyTitle: "Noch eine Idee?",
    reply: "Ob Referenzen, Wünsche oder weitere Details: Antworte einfach auf diese E-Mail. Deine Ergänzungen landen direkt bei uns.",
    closing: "Bis bald,",
    signature: "Simon von",
    footer: "Dies ist eine automatische Eingangsbestätigung zu deiner Kontaktanfrage.",
  },
  en: {
    subject: "Your message has reached us",
    preheader: "Thanks for getting in touch. We’ll get back to you personally.",
    label: "MESSAGE RECEIVED",
    title: "Good ideas start\nwith a hello.",
    greeting: "Hi",
    intro: "Thanks for getting in touch! Your message has reached us. We’re looking forward to learning more about you and your project.",
    nextTitle: "What happens next",
    next: "We’ll take a look at your request and get back to you personally to discuss your ideas and the next steps.",
    messageTitle: "Your message",
    replyTitle: "One more idea?",
    reply: "References, wishes or a few extra details? Just reply to this email. Your additions will reach us directly.",
    closing: "Speak soon,",
    signature: "Simon at",
    footer: "This is an automatic confirmation of your contact request.",
  },
} as const;

/** Table layout and inline styles keep the email readable without remote images or fonts. */
export function buildContactAutoReply(
  payload: Pick<ValidatedContactPayload, "name" | "message" | "locale">,
  siteName: string,
): { subject: string; text: string; html: string } {
  const c = copy[payload.locale];
  const homeUrl = `https://happyreels.de/${payload.locale}`;
  const subject = `${siteName}: ${c.subject}`;
  const text = [
    `${c.greeting} ${payload.name},`, "", c.intro, "",
    c.nextTitle, c.next, "", c.messageTitle, payload.message, "",
    c.replyTitle, c.reply, "", c.closing, `${c.signature} ${siteName}`, homeUrl, "", c.footer,
  ].join("\n");
  const brand = escapeHtml(siteName);
  const message = escapeHtml(payload.message).replace(/\r\n|\r|\n/g, "<br>");
  const html = `<!DOCTYPE html>
<html lang="${payload.locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${escapeHtml(subject)}</title>
<style>
  body, table, td, p, h1, h2 { margin: 0; padding: 0; }
  table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  @media only screen and (max-width: 620px) {
    .outer { padding: 16px 10px !important; }
    .panel { padding: 28px 24px !important; }
    .headline { font-size: 34px !important; line-height: 38px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#e7d6d0;color:#37252d;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<div style="display:none;font-size:1px;color:#e7d6d0;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(c.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#e7d6d0"><tr><td class="outer" align="center" style="padding:40px 16px;">
<!--[if mso]><table role="presentation" width="600" align="center"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;table-layout:fixed;">
<tr><td class="panel" bgcolor="#37252d" style="padding:28px 40px;border-radius:24px 24px 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td width="72" valign="middle" style="width:72px;padding-right:18px;">
<a href="${homeUrl}" target="_blank" rel="noopener noreferrer" style="color:#f4b23e;text-decoration:none;">
<img src="cid:${CONTACT_EMAIL_LOGO_CID}" width="54" height="43" alt="${brand}" border="0" style="display:block;width:54px;height:43px;border:0;color:#f4b23e;font-size:12px;">
</a>
</td>
<td valign="middle">
<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:800;letter-spacing:-1px;line-height:34px;color:#f4b23e;">${escapeHtml(siteName.toLowerCase())}</p>
<p style="margin:6px 0 0;font-size:12px;line-height:18px;color:#f8ebe7;">From footage to feeling.</p>
</td></tr></table>
</td></tr>
<tr><td class="panel" bgcolor="#f4b23e" style="padding:36px 40px 40px;color:#37252d;">
<p style="margin:0 0 18px;font-size:11px;line-height:16px;letter-spacing:2px;font-weight:bold;">${c.label}</p>
<h1 class="headline" style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:42px;line-height:46px;letter-spacing:-1.5px;font-weight:800;">${escapeHtml(c.title).replace(/\n/g, "<br>")}</h1>
</td></tr>
<tr><td class="panel" bgcolor="#f8ebe7" style="padding:36px 40px 40px;color:#37252d;">
<p style="margin:0 0 14px;font-size:18px;line-height:28px;font-weight:bold;overflow-wrap:anywhere;word-break:break-word;">${c.greeting} ${escapeHtml(payload.name)},</p>
<p style="margin:0 0 28px;font-size:16px;line-height:26px;">${c.intro}</p>
<h2 style="margin:0 0 8px;font-size:18px;line-height:26px;">${c.nextTitle}</h2>
<p style="margin:0 0 28px;font-size:16px;line-height:26px;">${c.next}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;"><tr><td bgcolor="#e7d6d0" style="padding:22px 24px;border-left:4px solid #f4b23e;border-radius:0 12px 12px 0;color:#37252d;">
<h2 style="margin:0 0 10px;font-size:12px;line-height:18px;letter-spacing:1px;">${c.messageTitle}</h2>
<p style="margin:0;font-size:15px;line-height:25px;overflow-wrap:anywhere;word-wrap:break-word;word-break:break-word;">${message}</p>
</td></tr></table>
<h2 style="margin:28px 0 8px;font-size:18px;line-height:26px;">${c.replyTitle}</h2>
<p style="margin:0 0 28px;font-size:16px;line-height:26px;">${c.reply}</p>
<p style="margin:0;font-size:16px;line-height:26px;">${c.closing}<br><strong>${c.signature} ${brand}</strong></p>
</td></tr>
<tr><td bgcolor="#37252d" style="padding:28px;border-radius:0 0 24px 24px;color:#f8ebe7;text-align:center;">
<a href="${homeUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;color:#f4b23e;text-decoration:none;">
<img src="cid:${CONTACT_EMAIL_LOGO_CID}" width="72" height="57" alt="${brand}" border="0" style="display:block;width:72px;height:57px;margin:0 auto;border:0;color:#f4b23e;font-size:12px;">
</a>
<p style="margin:18px 0 0;font-size:12px;line-height:19px;">${c.footer}</p>
</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table>
</body></html>`;
  return { subject, text, html };
}
