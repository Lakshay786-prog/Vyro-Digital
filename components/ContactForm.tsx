"use client";
import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website development",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validate() {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("Please fill in your name, email and project message.");
      setIsSuccess(false);
      return false;
    }
    return true;
  }

  function formatEnquiryText() {
    return [
      "NEW WEBSITE ENQUIRY — VYRO DIGITAL",
      "",
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Phone / WhatsApp: ${formData.phone.trim() || "Not provided"}`,
      `Service: ${formData.service || "General enquiry"}`,
      "",
      "Project Details:",
      formData.message.trim(),
    ].join("\n");
  }

  function sendViaWhatsApp(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    if (!validate()) return;

    const text = formatEnquiryText();
    const url = `https://wa.me/918082703677?text=${encodeURIComponent(text)}`;
    setIsSuccess(true);
    setStatus("Connecting via WhatsApp with your enquiry details…");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function sendViaEmail(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    if (!validate()) return;

    const text = formatEnquiryText();
    const subject = `New VYRO Enquiry — ${formData.service} | ${formData.name.trim()}`;

    // 1. Direct Gmail web compose link (opens in browser tab without needing local desktop app)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vyrodigital04@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(text)}`;

    // 2. Standard mailto fallback
    const mailtoUrl = `mailto:vyrodigital04@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(text)}`;

    setIsSuccess(true);
    setStatus("Opening Gmail with your enquiry pre-filled…");

    // Open Gmail web compose in a new tab
    const win = window.open(gmailUrl, "_blank", "noopener,noreferrer");

    // If popup blocker intervened or on mobile without web tab, fallback to mailto
    if (!win || win.closed || typeof win.closed === "undefined") {
      window.location.href = mailtoUrl;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendViaWhatsApp();
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          Your name
          <input
            name="name"
            required
            placeholder="Full name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Work email
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
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
          />
        </label>
        <label>
          I&apos;m interested in
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
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
        Tell us about your project
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What are you looking to build or improve?"
          value={formData.message}
          onChange={handleChange}
        />
      </label>

      <div className="contact-actions-row">
        <button
          className="button button-gold"
          type="button"
          onClick={sendViaWhatsApp}
        >
          Send via WhatsApp ↗
        </button>
        <button
          className="button button-outline"
          type="button"
          onClick={sendViaEmail}
        >
          Send via Gmail ↗
        </button>
      </div>

      {status && (
        <p
          className="form-status"
          aria-live="polite"
          style={{ color: isSuccess ? "var(--gold)" : "#ff6b6b" }}
        >
          {status}
        </p>
      )}

      <small>
        Enquiries are routed directly to <b>vyrodigital04@gmail.com</b> and WhatsApp at <b>+91 80827 03677</b>.
      </small>
    </form>
  );
}
