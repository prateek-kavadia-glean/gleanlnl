# Implementation Notes: On-Site AI Strategy Session Landing Page

This document describes the structure, editable areas, and technical decisions for the landing page.

## Editable Text Areas (Non-Developer)

### CONFIG (script.js)
All campaign-specific values live in the `CONFIG` object at the top of `script.js`:

| Key | Purpose | Example |
|-----|---------|---------|
| `cityRegion` | Target city/region for sessions | `"San Francisco Bay Area"` |
| `availabilityWindow` | Date range for sessions | `"March 24–28, 2025"` |
| `formatSummary` | Badge text for format | `"On-site AI strategy sessions (breakfast, lunch, or coffee)"` |
| `responseSLA` | Follow-up time commitment | `"2 business days"` |
| `prepDuration` | Prep call length (agenda) | `"30–45 minute"` |
| `sessionDuration` | On-site session length (agenda) | `"60–90 minutes"` |
| `contactEmail` | Contact/mailto address | `"events@glean.com"` |
| `speakers` | Array of speaker objects (name, title, bio, initialsFallback) | See script.js |

### Hero Section (index.html)
- **Headline**: `<h1>` — Currently: "Host an on-site AI strategy session at your office"
- **Subheadline**: `.hero-subtitle` — One-sentence value prop
- **Badges**: Populated from CONFIG via `data-config-text` attributes

### Agenda (index.html)
- Prep duration and session duration are driven by `data-config-text="prepDuration"` and `data-config-text="sessionDuration"`
- Timeline items (0:00–0:10, etc.) can be edited directly in the HTML

### Social Proof (index.html)
- **Logo band**: Replace `.logo-placeholder` spans with `<img>` tags or SVG for customer logos
- **Testimonials**: Edit `.testimonial-card` blockquotes — update quote text and footer attribution

## Form Field Mapping

| Field ID | Name | Required | Notes |
|----------|------|----------|-------|
| `fullName` | fullName | Yes | |
| `workEmail` | workEmail | Yes | Validated; personal domains show warning |
| `company` | company | Yes | |
| `jobTitle` | jobTitle | Yes | |
| `officeLocation` | officeLocation | Yes | City & address |
| `preferredFormat` | preferredFormat | Yes | Dropdown: Breakfast, Lunch-and-learn, Coffee/afternoon, Not sure, Other |
| `otherFormatDetails` | otherFormatDetails | No | Shown when "Other" selected |
| `preferredDatesTimes` | preferredDatesTimes | Yes | Free text |
| `estimatedAttendees` | estimatedAttendees | No | Numeric |
| `championContact` | championContact | No | |
| `aiJourney` | aiJourney | No | Long text |
| `desiredOutcomes` | desiredOutcomes | No | Long text |
| `optIn` | optIn | No | Checkbox, unchecked by default |

## Analytics-Ready Selectors

Use these for tracking (e.g., GTM, Segment):

- `[data-analytics="hero_request_session"]` — Hero CTA
- `[data-analytics="nav_request_session"]` — Nav CTA
- `[data-analytics="how_it_works_request_session"]` — After How it works
- `[data-analytics="what_youll_learn_request_session"]` — After What you'll learn
- `[data-analytics="faq_request_session"]` — After FAQ
- `[data-analytics="form_submit"]` — Submit button

Form events are logged via `trackEvent()` in script.js: `form_validation_error`, `form_submit_attempt`, `form_submit_success`, `form_submit_error`.

## Form Submission

The form POSTs to `/api/onsite-ai-session-requests`. Replace this endpoint with your backend. The payload includes all form fields plus `confirmationEmail` template for the auto-reply.

On success, the form is replaced with an in-place confirmation card (no page reload).

## Assumptions

1. **Backend**: No backend is included. Wire the form to your CRM, spreadsheet, or email service.
2. **Logos**: Social proof uses placeholder text; replace with real customer logos.
3. **Speakers**: Use `initialsFallback` when headshots are not available; add optional `headshotUrl` to CONFIG for future image support.
4. **Accessibility**: Form uses `aria-invalid`, `aria-describedby`, and proper labels. Ensure sufficient color contrast (WCAG AA).
