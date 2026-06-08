export type ContactMailConfig = Readonly<{
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  mailFrom: string;
  mailTo: string;
  siteName: string;
  autoReplyEnabled: boolean;
}>;

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value.trim() === "") return fallback;
  const normalized = value.trim().toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes") return true;
  if (normalized === "false" || normalized === "0" || normalized === "no") return false;
  return fallback;
}

export function getContactMailConfig(): ContactMailConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const mailFrom = process.env.MAIL_FROM?.trim();
  const mailTo = process.env.MAIL_TO?.trim();

  if (!host || !user || !pass || !mailFrom || !mailTo) {
    return null;
  }

  const portRaw = process.env.SMTP_PORT?.trim() || "465";
  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port <= 0) {
    return null;
  }

  const secureDefault = port === 465;
  const secure = parseBoolean(process.env.SMTP_SECURE, secureDefault);

  const siteName =
    process.env.CONTACT_SITE_NAME?.trim() || "Simon Saad Visuals";
  const autoReplyEnabled = parseBoolean(
    process.env.CONTACT_AUTO_REPLY_ENABLED,
    true,
  );

  return {
    host,
    port,
    secure,
    user,
    pass,
    mailFrom,
    mailTo,
    siteName,
    autoReplyEnabled,
  };
}
