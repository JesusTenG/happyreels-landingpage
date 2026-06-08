"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { contactCtaClassNames } from "@/components/ui/contactCtaButton";
import SVisualsButton from "@/components/ui/SVisualsButton";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import styles from "./FinalCtaSection.module.css";

type Props = Readonly<{
  form: Dictionary["contact"]["form"];
  locale: Locale;
}>;

type FieldKey = "name" | "email" | "message";

type FormValues = Record<FieldKey, string>;

type FormErrors = Partial<Record<FieldKey, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues, form: Dictionary["contact"]["form"]): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim().replace(/\s+/g, " ");
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = form.errors.nameRequired;
  else if (name.length < 2) errors.name = form.errors.nameTooShort;

  if (!email) errors.email = form.errors.emailRequired;
  else if (!EMAIL_PATTERN.test(email) || email.length > 120) {
    errors.email = form.errors.emailInvalid;
  }

  if (!message) errors.message = form.errors.messageRequired;
  else if (message.length < 10) errors.message = form.errors.messageTooShort;

  return errors;
}

type ApiResponse = {
  ok?: boolean;
  message?: string;
};

export function ContactForm({ form, locale }: Props) {
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;
  const honeypotId = `${formId}-website`;
  const startedAtRef = useRef(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"success" | "error" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: FieldKey, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    if (statusMessage) {
      setStatusMessage(null);
      setStatusTone(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values, form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage(null);
      setStatusTone(null);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);
    setStatusTone(null);

    const payload = {
      name: values.name.trim().replace(/\s+/g, " "),
      email: values.email.trim(),
      message: values.message.trim(),
      website: honeypot,
      startedAt: startedAtRef.current,
      locale,
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as ApiResponse;
      const message =
        typeof data.message === "string" && data.message
          ? data.message
          : response.ok
            ? form.success
            : form.errorSend;

      if (response.ok && data.ok !== false) {
        setValues({ name: "", email: "", message: "" });
        setHoneypot("");
        startedAtRef.current = Date.now();
        setStatusMessage(message);
        setStatusTone("success");
        return;
      }

      setStatusMessage(message);
      setStatusTone("error");
    } catch {
      setStatusMessage(form.errorSend);
      setStatusTone("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const statusClassName =
    statusTone === "error"
      ? `${styles["contact-section__status"]} ${styles["contact-section__status--error"]}`
      : styles["contact-section__status"];

  return (
    <form
      className={styles["contact-section__form"]}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={statusMessage ? `${formId}-status` : undefined}
    >
      <div className={styles["contact-section__field"]} aria-hidden="true">
        <label className={styles["contact-section__honeypot-label"]} htmlFor={honeypotId}>
          Website
        </label>
        <input
          id={honeypotId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          className={styles["contact-section__honeypot"]}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className={styles["contact-section__field"]}>
        <label className={styles["contact-section__label"]} htmlFor={nameId}>
          {form.nameLabel}
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          placeholder={form.namePlaceholder}
          className={styles["contact-section__input"]}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
          disabled={isSubmitting}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name ? (
          <p id={`${nameId}-error`} className={styles["contact-section__error"]} role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={styles["contact-section__field"]}>
        <label className={styles["contact-section__label"]} htmlFor={emailId}>
          {form.emailLabel}
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={values.email}
          placeholder={form.emailPlaceholder}
          className={styles["contact-section__input"]}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          disabled={isSubmitting}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email ? (
          <p id={`${emailId}-error`} className={styles["contact-section__error"]} role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={styles["contact-section__field"]}>
        <label className={styles["contact-section__label"]} htmlFor={messageId}>
          {form.messageLabel}
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={5}
          value={values.message}
          placeholder={form.messagePlaceholder}
          className={`${styles["contact-section__input"]} ${styles["contact-section__textarea"]}`}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          disabled={isSubmitting}
          onChange={(e) => handleChange("message", e.target.value)}
        />
        {errors.message ? (
          <p id={`${messageId}-error`} className={styles["contact-section__error"]} role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className={styles["contact-section__actions"]}>
        <SVisualsButton
          type="submit"
          showIcon={false}
          disabled={isSubmitting}
          className={`${contactCtaClassNames.primary} ${contactCtaClassNames.prominent}`}
        >
          {isSubmitting ? form.sending : form.submit}
        </SVisualsButton>
      </div>

      {statusMessage ? (
        <p
          id={`${formId}-status`}
          className={statusClassName}
          role={statusTone === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}
