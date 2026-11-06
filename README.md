# VYRO Digital — Full Website

A multi-page Next.js website for VYRO Digital with responsive navigation, subtle motion, service pages, founder profile, portfolio concept gallery, pricing, insights preview, and a contact API route powered by Gmail SMTP and Nodemailer.

## Pages
- `/` Home
- `/about` About VYRO
- `/founder` Hewan Kachru — Founder & CMO
- `/services` Services
- `/work` Portfolio concepts with category filter
- `/pricing` Packages and individual price list
- `/insights` Editorial previews
- `/contact` Contact form and contact details

## Run locally
1. Install Node.js 20 or later.
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Gmail credentials.
4. Run `npm run dev` and open http://localhost:3000.

## Enable live enquiry emails
The contact form submits directly via `fetch('/api/contact')` without redirecting visitors to Gmail compose:

1. **Enable 2-Step Verification**:
   - Go to your Google Account Security settings: [myaccount.google.com/security](https://myaccount.google.com/security)
   - Ensure 2-Step Verification is turned **ON**.
2. **Create a 16-Character Gmail App Password**:
   - Go to: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select App name (e.g. "VYRO Website") and generate the 16-character code.
3. **Configure Environment Variables**:
   - Locally, add them to `.env.local`:
     - `GMAIL_USER=vyrodigital04@gmail.com`
     - `GMAIL_PASS=your_16_character_app_password`
     - `CONTACT_TO=vyrodigital04@gmail.com`
     - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
   - **Important**: `.env.local` is listed in `.gitignore` and is **never committed or deployed to git repositories or shared zip archives**. You must enter these variables in your hosting provider's dashboard:
     - On **Vercel**: Project → Settings → Environment Variables
     - On **Render**: Dashboard → Web Service → Environment → Add Environment Variable
4. **Host Requirement**:
   - The host must run a **Node.js environment** (`next start`), not a purely static HTML export (`next export` / `output: 'export'`), so the `/api/contact` API route can execute and dispatch emails securely.

## Before launch
- Replace concept portfolio cards with real client work, or keep their concept labels.
- Review all pricing, inclusions, support limits, and payment terms.
- Add final social profile URLs and production domain.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain.
- Test mobile navigation, forms, links, accessibility and SEO after deployment.

## Stack
Next.js App Router (15+), React 19, TypeScript, CSS, Nodemailer with Gmail SMTP.
