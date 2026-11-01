"use client";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    setIsSuccess(false);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Unable to send enquiry.");
      setIsSuccess(true);
      setStatus("Thanks — your enquiry has been received. We'll be in touch soon.");
      form.reset();
    } catch (err) {
      setIsSuccess(false);
      setStatus(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label>
          Your name
          <input name="name" required placeholder="Full name" autoComplete="name" />
        </label>
        <label>
          Work email
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            autoComplete="email"
          />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Phone / WhatsApp
          <input name="phone" placeholder="+91" autoComplete="tel" />
        </label>
        <label>
          I&apos;m interested in
          <select name="service" defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option>Branding &amp; design</option>
            <option>Website development</option>
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
        Tell us about your project
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What are you looking to build or improve?"
        />
      </label>

      <button className="button button-gold" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Send enquiry ↗"}
      </button>

      {status && (
        <p
          className="form-status"
          aria-live="polite"
          style={{ color: isSuccess ? "var(--gold)" : "#ff6b6b" }}
        >
          {status}
        </p>
      )}

      <small>By submitting, you agree that VYRO Digital may contact you about this enquiry.</small>
    </form>
  );
}
