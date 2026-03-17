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
- **Form**: Replaced with **Typeform** embed. Set `CONFIG.typeformFormId` in `script.js` to your form ID; widget loads in `#typeform-embed-container`. When empty, fallback message with “Open in new tab” / “email us” is shown. Analytics for CTAs unchanged.
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
| **Logo assets** | Marketing | Logos loaded from `assets/logos/`: `databricks.png`, `confluent.png`, `purestorage.png`, `webflow.webp`, `duolingo.png`, `grammarly.png`. CSS: `.customer-logo` (height 28px, grayscale, hover color). |
| **Hero image** | Marketing | Optional: product UI screenshot or event artwork. Replace `assets/hero-work-ai.svg` or set `src` in hero `<figure>`. |
| **Testimonials** | Marketing | Real quotes with name, title, company. Add to `TESTIMONIALS` array in `script.js` (quote, name, title, company). |
| **Analytics config** | Marketing / Ops | Ensure `dataLayer` is defined (e.g. GTM) so `trackEvent` pushes are consumed. Events: `lnl_event` with action/label. |
| **Canonical URL** | Marketing / Ops | Update `<link rel="canonical">` and `og:url` / Twitter when production URL is set. |
| **Typeform form** | Marketing / Ops | Set `CONFIG.typeformFormId` in `script.js` to your Typeform form ID (from Typeform Share → Embed, e.g. `njdbt5` from https://form.typeform.com/to/njdbt5). Create the form in Typeform with equivalent fields (name, work email, company, etc.). |
| **OG image** | Marketing | Replace `og:image` placeholder with final share image if available. |

---

## Optional / future

- **Speaker headshots**: Add optional `headshotUrl` to `CONFIG.speakers`; in `renderSpeakers()` render `<img class="speaker-avatar">` when set.
- **CONFIG externalization**: Move CONFIG to JSON or per-region file (e.g. `config.sf.json`, `config.nyc.json`) for multi-region pages.
- **Accessibility**: Addressed: skip-to-main-content link, `:focus-visible` on interactive elements (buttons, links, nav toggle, theme toggle, FAQ summary), main landmark with `id="main-content"`, scroll-padding for anchor focus, theme toggle dynamic aria-label, timeline/form dark-theme contrast. Run axe or Lighthouse for full audit if needed.
- **Backend / CRM**: If submissions must land in CRM or spreadsheet, replace FormSubmit.co fetch with Glean endpoint or serverless forwarder.
