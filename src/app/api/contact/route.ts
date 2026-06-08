import { NextResponse } from "next/server";

import type { Locale } from "@/i18n/config";
import { contactApiMessage } from "@/lib/mail/contact-api-messages";
import { getContactMailConfig } from "@/lib/mail/contact-env";
import {
  sendContactAutoReply,
  sendOperatorContactMail,
} from "@/lib/mail/contact-mail";
import {
  isHoneypotTriggered,
  isSubmitTooFast,
  validateContactPayload,
  type ContactPayloadInput,
} from "@/lib/mail/contact-validation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;

function resolveLocale(value: unknown): Locale {
  return value === "en" ? "en" : "de";
}

function successResponse(locale: Locale) {
  return NextResponse.json(
    { ok: true, message: contactApiMessage(locale, "success") },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const length = Number.parseInt(contentLength, 10);
    if (Number.isFinite(length) && length > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          message: contactApiMessage("de", "validation"),
        },
        { status: 400 },
      );
    }
  }

  let body: ContactPayloadInput;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          message: contactApiMessage("de", "validation"),
        },
        { status: 400 },
      );
    }
    body = JSON.parse(raw) as ContactPayloadInput;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: contactApiMessage("de", "validation"),
      },
      { status: 400 },
    );
  }

  const locale = resolveLocale(body.locale);

  if (isHoneypotTriggered(body.website) || isSubmitTooFast(body.startedAt)) {
    return successResponse(locale);
  }

  const validation = validateContactPayload(body);
  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: contactApiMessage(locale, "validation"),
      },
      { status: 400 },
    );
  }

  const mailConfig = getContactMailConfig();
  if (!mailConfig) {
    console.error("[contact] SMTP/mail environment variables are not configured.");
    return NextResponse.json(
      {
        ok: false,
        message: contactApiMessage(locale, "sendError"),
      },
      { status: 500 },
    );
  }

  const userAgent = request.headers.get("user-agent");
  const sendContext = {
    config: mailConfig,
    payload: validation.data,
    userAgent: userAgent && userAgent.length <= 500 ? userAgent : null,
  };

  try {
    await sendOperatorContactMail(sendContext);

    if (mailConfig.autoReplyEnabled) {
      try {
        await sendContactAutoReply(sendContext);
      } catch (autoReplyError) {
        const detail =
          autoReplyError instanceof Error
            ? autoReplyError.message
            : "Auto-reply failed";
        console.error("[contact] Auto-reply failed:", detail);
      }
    }

    return successResponse(validation.data.locale);
  } catch (sendError) {
    const detail =
      sendError instanceof Error ? sendError.message : "Mail send failed";
    console.error("[contact] Operator mail failed:", detail);

    return NextResponse.json(
      {
        ok: false,
        message: contactApiMessage(locale, "sendError"),
      },
      { status: 500 },
    );
  }
}
