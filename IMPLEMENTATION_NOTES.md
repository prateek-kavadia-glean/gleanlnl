# Implementation Notes: Lunch & Learn Microsite

Running backlog and integration checklist. Update as items are completed.

---

## Usability & quality audit (current status)

Summary of a deep analysis across content, UX, performance/SEO, and credibility.

### Content quality & accuracy

- **Strengths**: Copy is clear, event-specific (SF Bay Area, March 30–April 3, 2026), and CONFIG-driven for SLA and region. One source of truth for key dates and messaging. FAQ answers are concise and set expectations (complimentary session, Glean covers lunch).
- **Gaps**: No content review cadence; event copy will go stale after April 2026. Speaker names are hardcoded in both HTML (“Prateek Kavadia and Tanner Cherry… Nick DeVito”) and `CONFIG.speakers`—risk of drift. JSON-LD description says “Limited on-site” but doesn’t mention “complimentary” or “lunch covered.” Contact is a single mailto (nick.devito@glean.com) with no backup or contact page.

### User experience (UX) & design

- **Layout & navigation**: Sticky header, clear section anchors (#about, #how-it-works, etc.), single primary CTA (“Request an on-site AI session”). Mobile nav toggles at 767px; nav links collapse into a drawer. Footer is dense but well grouped (Product, Solutions, Resources, Company).
- **Visuals**: Hero uses gradient and optional `hero-work-ai.svg` (present). **Critical**: `assets/glean-icon.png`, `assets/glean-wordmark.png`, and all six customer logos (`assets/logos/*.png|.webp`) are **missing** from the repo—nav logo, favicon, footer logo, and logo band will 404 and hurt trust.
- **Typography & whitespace**: DM Sans loaded; PolySans in font stack but not loaded (fallback to DM Sans). Section spacing (5rem / 4.5rem) and container max-width (1120px) are consistent. Form section uses strong blue gradient and stands out.
- **Mobile**: Breakpoints at 991px, 767px, 600px; grids collapse to single column; hero panel reorders above copy; form and logistics stack. Touch targets (buttons, nav toggle) are adequate. Theme toggle fixed bottom-left may overlap content on very small viewports.

### Performance & technical SEO

- **Page weight**: Single HTML, one CSS file, one small script, Typeform embed script (third-party). Fonts: Google Fonts (DM Sans) with preconnect—consider `font-display: swap` (handled by Google’s default).
- **Load performance**: No explicit preload for LCP (hero image or font). Typeform script loads from embed.typeform.com and can delay interactivity; consider loading it after main content or lazy-loading the form container. Target: first load under 3 seconds on fast 3G; measure with Lighthouse.
- **SEO**: Title, meta description, canonical, OG and Twitter tags present. **Canonical mismatch**: `<link rel="canonical">` and `og:url` point to `https://www.glean.com/lunch-and-learn`, while `CNAME` is `www.gleanworkshop.com`. If the site is served at gleanworkshop.com, canonical and `og:url` should match the actual deployment URL to avoid duplicate-content and sharing issues.
- **Security**: No sensitive logic client-side. Ensure production is served over HTTPS (GitHub Pages + custom domain typically provides this).

### Credibility

- **Contact**: Single mailto in hero (“Questions? Contact us”) and physical addresses in footer (SF + Palo Alto). No dedicated contact page or form fallback if Typeform fails.
- **Legal**: Footer links to glean.com Website Terms and Privacy—appropriate for a microsite. Trust center linked under Company.
- **Social**: No links to Glean’s LinkedIn, Twitter/X, or other social in footer. Adding them would support legitimacy and follow-through from social campaigns.

---

## Action items (prioritized)

| Priority | Action | Owner | Notes |
|----------|--------|--------|--------|
| **P0** | Add missing image assets | Marketing / Dev | **Required for launch**: `assets/glean-icon.png`, `assets/glean-wordmark.png`, and `assets/logos/` (databricks.png, confluent.png, purestorage.png, webflow.webp, duolingo.png, grammarly.png). Without these, nav, favicon, footer, and social-proof strip show broken images. |
| **P0** | Align canonical URL with deployment | Ops / Dev | If site is live at `https://www.gleanworkshop.com`, set `<link rel="canonical">`, `og:url`, and Twitter card URL to that origin. Update when production URL is final. |
| **P1** | Verify OG image and Twitter image | Marketing | Current `og:image` is `https://www.glean.com/images/og-lunch-and-learn.png`. Confirm this URL returns a valid image and add `twitter:image` if you want consistent previews on Twitter. |
| **P1** | Ensure HTTPS and &lt;3s target | Ops / Dev | Confirm production is HTTPS. Run Lighthouse (Performance + SEO); optimize if LCP or TTI exceeds ~3s (e.g. font loading, Typeform load strategy). |
| **P2** | Add social links to footer | Marketing / Dev | Add optional “Follow us” or inline links to Glean’s LinkedIn, Twitter/X, etc., in footer for credibility. |
| **P2** | Document content review cadence | Marketing | After event week, either archive the page or update copy/dates for future runs. Note in runbook or checklist. |
| **P2** | Single source for speaker names | Dev | Pull speaker intro in “On-site hosts” from CONFIG (or a shared snippet) so names don’t diverge from `CONFIG.speakers`. |

---

## Suggested improvements

- **Content**: Add one line to FAQ or Logistics: “How do I get in touch if I have questions?” → “Email us at [contact] or use the form above.” Reduces reliance on a single mailto. Consider adding a short “Last updated” or event-status note when the event has passed.
- **UX**: Add `loading="lazy"` to hero image if it’s below the fold on mobile (already present on customer logos). Consider hiding or moving the floating theme toggle on narrow viewports if it overlaps CTA or form. Optional: “Back to top” link in footer for long sessions.
- **Performance**: Preload the LCP image (e.g. hero SVG or primary logo) if it’s critical for LCP. Lazy-load or defer the Typeform embed script until the form section is near the viewport (e.g. Intersection Observer) to improve initial load.
- **Credibility**: Add a one-line “Contact” or “Questions?” in the footer (mailto or link to main site contact) in addition to hero. If testimonials are added later, keep them real and attributed (already the standard in code).
- **A11y**: Run axe or Lighthouse Accessibility; fix any new issues. Ensure theme toggle and nav toggle have sufficient contrast in both themes.

---

## Completed

- **Hero**: SF Bay Area Lunch & Learn week framing; eyebrow badge; headline “On-site Work AI Lunch & Learn with your leadership team”; subcopy with agentic AI use cases, see Glean live, practical roadmap; primary CTA scrolls to form.
- **CONFIG**: Single source of truth in `script.js` for region, availabilityWindow (March 30–April 3, 2026), responseSLA (2 business days), responseSLABusinessDays, heroEyebrow; grouped and commented for future per-region/JSON externalization.
- **SLA copy**: All “within [SLA]” and “limited availability” replaced with CONFIG-driven text and explicit “We’ll get back to you within 2 business days to schedule a short prep call and confirm details.”
- **What is Glean**: Short blurb in About (Work AI that works; AI Assistant and Agents; company knowledge; secure and at scale).
- **Social proof**: Logo strip structure and CSS in place; images expected from `assets/logos/` (see Action items). Testimonials: structure in place; `TESTIMONIALS` array in `script.js`; container hidden when empty (no fake quotes).
- **SEO**: `<title>`, meta description, canonical, Open Graph, Twitter cards in `index.html`. Canonical/og:url must match deployment URL (see Action items).
- **JSON-LD**: Event schema in `<head>` (name, description, location San Francisco Bay Area, start/end date, organizer Glean Technologies, Inc.).
- **Analytics**: `trackEvent(action, payload)` pushes to `window.dataLayer` as `lnl_event` with action/label. All `[data-analytics]` hooks (hero, nav, mid-page, footer CTAs) wired. Form events apply if Typeform is instrumented via GTM or equivalent.
- **Form**: **Typeform** embed in place via inline `data-tf-live` in `index.html` (form ID `01KKVW49T9J5VSSFTE8AY6BM70`). `CONFIG.typeformFormId` in `script.js` is unused for this live embed; document or centralize form ID if you add a fallback.
- **Copy**: About, What you’ll learn, Logistics tightened; executive phrases (priority agentic AI use cases, turn AI ambition into practical execution, live Glean deep dive) threaded; no Tier 1 or internal pipeline language.
- **A11y & semantics**: One `<h1>` (hero); `<h2>` for top-level sections; `<h3>` for cards/FAQ; `<main>`; form section `aria-labelledby="request-session-heading"`; skip link, `:focus-visible`, theme toggle aria-label.
- **FAQ**: Answers concise; one answer states session is complimentary and Glean covers lunch/refreshments.
- **Breakpoints**: Aligned to ~991px / 767px / 600px; hero visual responsive; rem-based spacing where used.
- **Hero visual**: `assets/hero-work-ai.svg` in use; `onerror` hides if missing. Easy to swap for product screenshot or event artwork.
- **Fonts**: PolySans in font stack; DM Sans loaded as fallback. When brand assets are available, add PolySans via `@font-face` or link for full glean.com parity.

---

## Integration checklist (what marketing needs to provide)

| Item | Owner | Notes |
|------|--------|--------|
| **Logo assets** | Marketing | **Critical.** Add to repo: `assets/glean-icon.png`, `assets/glean-wordmark.png`; `assets/logos/`: `databricks.png`, `confluent.png`, `purestorage.png`, `webflow.webp`, `duolingo.png`, `grammarly.png`. CSS: `.customer-logo` (height 28px, grayscale, hover color). |
| **Hero image** | Marketing | Optional: product UI screenshot or event artwork. Replace `assets/hero-work-ai.svg` or set `src` in hero `<figure>`. |
| **Testimonials** | Marketing | Real quotes with name, title, company. Add to `TESTIMONIALS` array in `script.js` (quote, name, title, company). |
| **Analytics config** | Marketing / Ops | Ensure `dataLayer` is defined (e.g. GTM) so `trackEvent` pushes are consumed. Events: `lnl_event` with action/label. |
| **Canonical URL** | Marketing / Ops | Set `<link rel="canonical">`, `og:url`, and Twitter URL to production origin (e.g. `https://www.gleanworkshop.com` if that’s the live URL). |
| **Typeform form** | Marketing / Ops | Current form is embedded in HTML (`data-tf-live`). To change form, update the attribute in `index.html` or move to CONFIG and render via script. Create form in Typeform with equivalent fields (name, work email, company, etc.). |
| **OG image** | Marketing | Confirm `og:image` (currently `https://www.glean.com/images/og-lunch-and-learn.png`) is correct and add `twitter:image` if desired. |

---

## Optional / future

- **Speaker headshots**: Add optional `headshotUrl` to `CONFIG.speakers`; in `renderSpeakers()` render `<img class="speaker-avatar">` when set.
- **CONFIG externalization**: Move CONFIG to JSON or per-region file (e.g. `config.sf.json`, `config.nyc.json`) for multi-region pages.
- **Accessibility**: Run axe or Lighthouse for a full audit; address any additional findings.
- **Backend / CRM**: If submissions must land in CRM or spreadsheet, use Typeform webhooks or replace with Glean endpoint or serverless forwarder.
- **Performance**: Lazy-load or defer Typeform script until form section is in view; preload LCP image if needed to hit &lt;3s target.
