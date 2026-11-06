"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website development",
    message: "",
    website: "", // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate(): boolean {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      setStatusMessage("Please enter your full name.");
      setIsSuccess(false);
      return false;
    }

    if (!trimmedEmail) {
      setStatusMessage("Please enter your email address.");
      setIsSuccess(false);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatusMessage("Please enter a valid email address.");
      setIsSuccess(false);
      return false;
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      setStatusMessage("Please provide at least 10 characters describing your project.");
      setIsSuccess(false);
      return false;
    }

    return true;
  }

  function formatEnquiryText() {
    return [
      "NEW WEBSITE ENQUIRY — VYRO DIGITAL",
      "",
      `Name: ${formData.name.trim() || "Not provided"}`,
      `Email: ${formData.email.trim() || "Not provided"}`,
      `Phone: ${formData.phone.trim() || "Not provided"}`,
      `Service: ${formData.service || "General enquiry"}`,
      "",
      "Project Details:",
      formData.message.trim() || "Interested in learning more about VYRO Digital services.",
    ].join("\n");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (isSubmitting) return;

    setStatusMessage("");
    setIsSuccess(false);

    if (!validate()) return;

    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15-second safeguard timeout

    try {
      // Always use same-origin /api/contact — frontend and API are deployed together
      const endpoint = "/api/contact";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          message: formData.message.trim(),
          website: formData.website, // honeypot
        }),
      });

      clearTimeout(timeoutId);

      let data: Record<string, unknown> | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.ok && data && (data.ok || data.success)) {
        setIsSuccess(true);
        setStatusMessage("Thank you — we'll reply within 24 hours.");
        // Clear the form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Website development",
          message: "",
          website: "",
        });
      } else {
        setIsSuccess(false);
        setStatusMessage(
          (data?.error as string) ||
            "Unable to send your message right now. Please try again or email us directly at vyrodigital04@gmail.com."
        );
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("[ContactForm] Submit error:", error);
      setIsSuccess(false);
      if (error?.name === "AbortError") {
        setStatusMessage(
          "Request timed out. Please check your connection or email us directly at vyrodigital04@gmail.com."
        );
      } else {
        setStatusMessage(
          "A network error occurred while submitting. Please check your connection or email us directly."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const whatsAppUrl = `https://wa.me/918082703677?text=${encodeURIComponent(
    formatEnquiryText()
  )}`;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate action="/api/contact" method="POST">
      {/* Honeypot field (hidden from screen readers & visual layout) */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor="website-hp">Website</label>
        <input
          id="website-hp"
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-grid">
        <label>
          Your name *
          <input
            name="name"
            required
            placeholder="Full name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>
        <label>
          Work email *
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Phone / WhatsApp
          <input
            name="phone"
            placeholder="+91"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </label>
        <label>
          I&apos;m interested in
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option>Website development</option>
            <option>Branding &amp; design</option>
            <option>SEO</option>
            <option>Social media management</option>
            <option>Google / Meta Ads</option>
            <option>Complete growth package</option>
            <option>Website edits / maintenance</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      <label>
        Tell us about your project *
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What are you looking to build or improve? (min. 10 characters)"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </label>

      {/* Status banner with aria-live */}
      {statusMessage && (
        <div
          className={`form-status-banner ${isSuccess ? "is-success" : "is-error"}`}
          role="status"
          aria-live="polite"
          style={{
            padding: "14px 18px",
            fontSize: "13px",
            lineHeight: "1.6",
            borderRadius: "2px",
            border: isSuccess
              ? "1px solid var(--gold)"
              : "1px solid rgba(255, 107, 107, 0.7)",
            background: isSuccess
              ? "rgba(201, 164, 92, 0.08)"
              : "rgba(255, 107, 107, 0.08)",
            color: isSuccess ? "var(--ivory)" : "#ff8080",
          }}
        >
          {isSuccess && (
            <span
              style={{
                display: "block",
                color: "var(--gold)",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "4px",
              }}
            >
              ✓ Success
            </span>
          )}
          {statusMessage}
        </div>
      )}

      <div className="contact-actions-row">
        <button
          className="button button-gold"
          type="submit"
          disabled={isSubmitting}
          style={{
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Sending…" : "Submit Enquiry →"}
        </button>

        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noreferrer"
          className="button button-outline"
        >
          Send via WhatsApp ↗
        </a>
      </div>

      <div className="contact-direct-link">
        <span style={{ color: "#888", fontSize: "12px" }}>
          or email us directly:{" "}
          <a
            href="mailto:vyrodigital04@gmail.com"
            style={{
              color: "var(--gold)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            vyrodigital04@gmail.com
          </a>
        </span>
      </div>
    </form>
  );
}
