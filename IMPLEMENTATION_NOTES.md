# Implementation Notes: On-Site AI Strategy Session Landing Page

This document describes the structure, editable areas, and technical decisions for the landing page.

## Brand Alignment (glean.com)

Design follows [Glean brand resources](https://www.glean.com/brand-resources):
- **Colors**: Primary Blue #343CED, Bright Green #D8FD49, Oatmeal #F6F3EB
- **Typography**: PolySans (primary), DM Sans (fallback)
- **Tagline**: "Work AI that works."

## Editable Text Areas (Non-Developer)

### CONFIG (script.js)
All campaign-specific values live in the `CONFIG` object at the top of `script.js`:

| Key | Purpose | Example |
|-----|---------|---------|
| `cityRegion` | Target city/region for sessions | `"San Francisco Bay Area"` |
| `availabilityWindow` | Date range for sessions | `"March 30–April 3, 2026"` |
| `formatSummary` | Badge text for format | `"Lunch and Learn (breakfast, lunch, or coffee)"` |
| `responseSLA` | Follow-up time commitment | `"2 business days"` |
| `prepDuration` | Prep call length (agenda) | `"30–45 minute"` |
| `sessionDuration` | On-site session length (agenda) | `"60–90 minutes"` |
| `contactEmail` | Contact/mailto for “Questions? Contact us” | `"prateek.kavadia@glean.com"` |
| `formNotifyEmails` | FormSubmit.co recipients (comma-separated) | `"prateek.kavadia@glean.com,tanner.cherry@glean.com,nick.devito@glean.com"` |
| `speakers` | Array of speaker objects (name, title, bio, initialsFallback) | Prateek Kavadia, Tanner Cherry; see script.js |
| `additionalSupport` | Optional copy for “support from” (e.g. Nick DeVito and Corporate team) | Used in speakers section copy |

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
| `preferredFormat` | preferredFormat | Yes | Dropdown: Breakfast, Lunch-and-learn, Coffee/afternoon, Dinner session, Not sure, Other |
| `preferredDate` | preferredDate | No | Dropdown: March 30–April 3, 2026 options (optional) |
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

The form uses **FormSubmit.co** (AJAX endpoint) to send submissions as emails to `prateek.kavadia@glean.com`, `tanner.cherry@glean.com`, and `nick.devito@glean.com`. Configure recipients in `CONFIG.formNotifyEmails` in script.js.

**First-time activation:** FormSubmit sends an activation email to the recipient addresses on first use. Each recipient must click the activation link before submissions will be delivered.

On success, the form is replaced with an in-place confirmation card (no page reload).

## Current campaign (as configured)

- **Dates**: March 30–April 3, 2026
- **Region**: San Francisco Bay Area
- **Hosts**: Prateek Kavadia, Tanner Cherry (Solutions Engineers). Additional support: Nick DeVito (Corporate Sales Director) and the Corporate team.
- **Form routing**: Submissions go to prateek.kavadia@glean.com, tanner.cherry@glean.com, nick.devito@glean.com via FormSubmit.co.

## Assumptions

1. **Backend**: No backend is included. FormSubmit.co sends email to the three recipients; wire to CRM/other later if needed.
2. **Logos**: Social proof uses customer names as text; replace with real logos if desired.
3. **Speakers**: Use `initialsFallback` when headshots are not available; add optional `headshotUrl` to CONFIG for future image support.
4. **Accessibility**: Form uses `aria-invalid`, `aria-describedby`, and proper labels. Ensure sufficient color contrast (WCAG AA).
