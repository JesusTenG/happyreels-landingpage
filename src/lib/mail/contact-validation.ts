import type { Locale } from "@/i18n/config";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayloadInput = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
  locale?: unknown;
  pageUrl?: unknown;
};

export type ValidatedContactPayload = Readonly<{
  name: string;
  email: string;
  message: string;
  locale: Locale;
  pageUrl: string | null;
}>;

export type ContactValidationResult =
  | { ok: true; data: ValidatedContactPayload }
  | { ok: false };

function trimField(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ");
}

function trimMessage(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function parseLocale(value: unknown): Locale {
  return value === "en" ? "en" : "de";
}

export function isHoneypotTriggered(website: unknown): boolean {
  if (typeof website !== "string") return false;
  return website.trim().length > 0;
}

export function isSubmitTooFast(startedAt: unknown): boolean {
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) {
    return false;
  }
  return Date.now() - startedAt < 2000;
}

export function validateContactPayload(
  input: ContactPayloadInput,
): ContactValidationResult {
  const name = trimField(input.name);
  const email = trimField(input.email).toLowerCase();
  const message = trimMessage(input.message);
  const locale = parseLocale(input.locale);

  if (name.length < 2 || name.length > 80) {
    return { ok: false };
  }

  if (!email || email.length > 120 || !EMAIL_PATTERN.test(email)) {
    return { ok: false };
  }

  if (message.length < 10 || message.length > 3000) {
    return { ok: false };
  }

  let pageUrl: string | null = null;
  if (typeof input.pageUrl === "string" && input.pageUrl.trim()) {
    const candidate = input.pageUrl.trim();
    if (candidate.length <= 500) {
      pageUrl = candidate;
    }
  }

  return {
    ok: true,
    data: { name, email, message, locale, pageUrl },
  };
}
