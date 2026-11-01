# VYRO Digital — Full Website

A multi-page Next.js website for VYRO Digital with responsive navigation, subtle motion, service pages, founder profile, portfolio concept gallery, pricing, insights preview, and a contact API route.

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
3. Copy `.env.example` to `.env.local`.
4. Run `npm run dev` and open http://localhost:3000.

## Enable live enquiry emails
The contact form posts to `/api/contact`. For actual email delivery:
1. Create a Resend account and verify a sending domain.
2. Create an API key.
3. Add `RESEND_API_KEY`, `CONTACT_TO`, and a verified `CONTACT_FROM` to `.env.local` and your hosting provider's environment settings.
4. Deploy the app and test a real enquiry end-to-end.

Until `RESEND_API_KEY` is configured, the form deliberately reports that email delivery is not configured and offers direct WhatsApp/email alternatives. Do not claim that the form is live before completing this setup and testing it.

## Before launch
- Replace concept portfolio cards with real client work, or keep their concept labels.
- Review all pricing, inclusions, support limits, and payment terms.
- Add final social profile URLs and domain.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- Configure analytics/consent as appropriate.
- Test mobile navigation, forms, links, accessibility and SEO after deployment.

## Stack
Next.js App Router, React, TypeScript, CSS, Resend API (optional email delivery integration).


## Latest visual update
The Founder page now uses a cinematic full-bleed portrait hero, warm dark overlays and editorial gold typography. The homepage founder feature also uses Hewan's portrait. The uploaded portrait is stored at `public/hewan-kachru.webp`.
