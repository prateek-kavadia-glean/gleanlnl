# Implementation Notes: Lunch & Learn Microsite

Running backlog and integration checklist. Update as items are completed.

---

## Completed

- **Hero**: SF Bay Area Lunch & Learn week framing; eyebrow badge; headline “On-site Work AI Lunch & Learn with your leadership team”; subcopy with agentic AI use cases, see Glean live, practical roadmap; primary CTA scrolls to form.
- **CONFIG**: Single source of truth in `script.js` for region, availabilityWindow (March 30–April 3, 2026), responseSLA (2 business days), responseSLABusinessDays, heroEyebrow; grouped and commented for future per-region/JSON externalization.
- **SLA copy**: All “within [SLA]” and “limited availability” replaced with CONFIG-driven text and explicit “We’ll get back to you within 2 business days to schedule a short prep call and confirm details.”
- **What is Glean**: Short blurb in About (Work AI that works; AI Assistant and Agents; company knowledge; secure and at scale).
- **Social proof**: Logo strip uses companies from glean.com customer stories (Bay Area–first): Databricks, Confluent, Pure Storage, Webflow, Duolingo, Grammarly. Logos loaded via Clearbit. Testimonials: structure in place; `TESTIMONIALS` array in `script.js`; container hidden when empty (no fake quotes).
- **SEO**: `<title>`, meta description, canonical, Open Graph, Twitter cards in `index.html`. Canonical URL placeholder: update when deploying.
- **JSON-LD**: Event schema in `<head>` (name, description, location San Francisco Bay Area, start/end date, organizer Glean Technologies, Inc.).
- **Analytics**: `trackEvent(action, payload)` pushes to `window.dataLayer` as `lnl_event` with action/label. All `[data-analytics]` hooks (hero, nav, mid-page, footer CTAs) and form events (form_submit_attempt, form_submit_success, form_submit_error, form_validation_error) wired.
- **Form**: `FORM_ENDPOINT` constant in `script.js`; payload structured for easy swap to Marketo/HubSpot/Glean endpoint; TODOs for Glean endpoint and UTM/campaignId hidden fields. Work email: `type="email"`, `inputmode="email"`, `autocomplete="email"`. Validation and free-email warning unchanged.
- **Copy**: About, What you’ll learn, Logistics tightened; executive phrases (priority agentic AI use cases, turn AI ambition into practical execution, live Glean deep dive) threaded; no Tier 1 or internal pipeline language.
- **Form UX**: Optional fields (AI journey, desired outcomes) labeled “(Optional)” and de-emphasized; required fields clearly marked.
- **A11y & semantics**: One `<h1>` (hero); `<h2>` for top-level sections; `<h3>` for cards/FAQ; `<main>`; form section `aria-labelledby="request-session-heading"`.
- **FAQ**: Answers concise; one answer states session is complimentary and Glean covers lunch/refreshments for Lunch & Learn.
- **Breakpoints**: Aligned to ~991px / 767px / 600px; hero visual responsive; rem-based spacing where used.
- **Hero visual**: Optional right-side visual (figure with img); `assets/hero-work-ai.svg` placeholder; `onerror` hides if missing. Easy to swap for product screenshot or event artwork.
- **Fonts**: PolySans in font stack; DM Sans loaded as fallback. When brand assets are available, add PolySans via `@font-face` or link in `styles.css` for full glean.com parity.

---

## Integration checklist (what marketing needs to provide)

| Item | Owner | Notes |
|------|--------|--------|
| **Logo assets** | Marketing | Logos currently loaded from Clearbit (glean.com customers: Databricks, Confluent, Pure Storage, Webflow, Duolingo, Grammarly). To use local assets instead, place in `assets/logos/` and update `index.html` src. Existing CSS: `.customer-logo` (height 28px, grayscale, hover color). |
| **Hero image** | Marketing | Optional: product UI screenshot or event artwork. Replace `assets/hero-work-ai.svg` or set `src` in hero `<figure>`. |
| **Testimonials** | Marketing | Real quotes with name, title, company. Add to `TESTIMONIALS` array in `script.js` (quote, name, title, company). |
| **Analytics config** | Marketing / Ops | Ensure `dataLayer` is defined (e.g. GTM) so `trackEvent` pushes are consumed. Events: `lnl_event` with action/label. |
| **Canonical URL** | Marketing / Ops | Update `<link rel="canonical">` and `og:url` / Twitter when production URL is set. |
| **Form endpoint** | Marketing / Ops | Replace `FORM_ENDPOINT` with Glean-owned endpoint or Marketo/HubSpot when ready; add hidden fields for UTM, campaignId, etc. (see TODOs in `script.js`). |
| **OG image** | Marketing | Replace `og:image` placeholder with final share image if available. |

---

## Optional / future

- **Speaker headshots**: Add optional `headshotUrl` to `CONFIG.speakers`; in `renderSpeakers()` render `<img class="speaker-avatar">` when set.
- **CONFIG externalization**: Move CONFIG to JSON or per-region file (e.g. `config.sf.json`, `config.nyc.json`) for multi-region pages.
- **Accessibility**: Run axe or Lighthouse and fix any remaining issues.
- **Backend / CRM**: If submissions must land in CRM or spreadsheet, replace FormSubmit.co fetch with Glean endpoint or serverless forwarder.
