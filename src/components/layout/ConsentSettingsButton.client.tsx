"use client";

import { CONSENT_SETTINGS_EVENT } from "@/lib/consent";

type Props = Readonly<{
  label: string;
  className?: string;
}>;

export function ConsentSettingsButton({ label, className }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT))}
    >
      {label}
    </button>
  );
}
