# AngkasaDev Solutions — Company Profile

Bilingual (ID/EN), static-first Astro website for AngkasaDev Solutions. Creative Engineering Studio aesthetic: warm bone, ink, indigo, orange and lime, responsive bespoke CSS, zero heavy frontend JS frameworks.

## Requirements
- Node.js 22+
- npm

## Local
```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

URLs: `/id`, `/en`, localized services, portfolio/work, about, insights, contact, privacy. `/` redirects to `/id`.

## Deployment — Cloudflare Pages
- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Production domain: `angkasadev.com` (only after domain ownership and DNS are confirmed)
- Cloudflare Pages Function: `functions/api/contact.js` handles POST `/api/contact`.
- Add secrets `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (sender from a **verified** domain), and `CONTACT_TO_EMAIL`.
- Enable WAF rate limit rule for `/api/contact`; consider Cloudflare Turnstile for production. Before public launch, verify legal/privacy text and consent requirements.
- Static `astro preview` does NOT run Cloudflare Pages Functions. Test forms using Cloudflare's `wrangler pages dev dist` or a deployed preview.

## Before publishing
1. Replace `src/components/WorkCards.astro` concept illustrations with **authorized, real** project screenshots and evidence-backed case studies. Current 3 cards are explicitly conceptual, not client portfolio claims.
2. Review and finalize logo, brand assets, and company copy (logo is a custom provisional monogram).
3. Verify `angkasadev.com` ownership, DNS, Google Search Console and real site URL.
4. Configure Resend and rate limiting. Confirm submission end-to-end in preview.
5. Obtain appropriate approval for privacy policy, company claims, and project attributions.
6. Add authored Insights articles; current page is an honest placeholder.

## Content
`src/data/site.ts` contains all localized strings, services and route definitions. Frontend templates live in `src/pages/[lang]/[...slug].astro`. No database or CMS is required.

## Notes
The initial concept art was generated for visual exploration, but the build uses original CSS/SVG UI illustrations and does not pretend those illustrations are actual client work. Dashboard figures are illustrative only. Reference inspired by Refero's 7shifts style guide, not a copy of its site's code.


## Generated visual assets

All image assets are included under `public/images/` and referenced by the Astro pages.
The homepage hero, portfolio cards, and development process/team/mobile sections use these WebP images.
The `homepage-preview.html` at project root references `images/` packaged alongside it; for a self-contained browser preview open the separately distributed `angkasadev-homepage-preview-standalone.html`.

**Important:** Image scenes, names, product screens, project numbers, and people in these generated visuals are fictional examples, not verified clients, measured results, or actual team documentation. Replace with authorized real case-study material before publishing portfolio claims.
