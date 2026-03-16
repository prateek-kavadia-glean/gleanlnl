# Implementation Notes: Remaining To-Do

Only items not yet done, with specific locations and steps.

---

## 1. Customer logos (social proof)

**Where:** `index.html` — section with class `social-proof`, inside `.logo-band` (six `<span class="customer-logo-text">` elements: Plaid, Pinterest, WealthSimple, Gainsight, Greenhouse, LaunchDarkly).

**To-do:** Replace each `<span class="customer-logo-text">CompanyName</span>` with an `<img>` when you have logo assets, e.g.:

```html
<img src="path/to/plaid-logo.svg" alt="Plaid" class="customer-logo" />
```

Keep or remove the `.customer-logo-text` class if you keep any as text. Existing CSS: `.customer-logo` in `styles.css` (height 28px, grayscale, hover full color).

---

## 2. Speaker headshots

**Where:** `script.js` — `renderSpeakers()` builds speaker cards using only `initialsFallback` (avatar is a div with initials). CONFIG `speakers` in `script.js` has no `headshotUrl` property.

**To-do:**  
- Add optional `headshotUrl` to each speaker in the `CONFIG.speakers` array (e.g. `headshotUrl: "assets/speakers/prateek.jpg"`).  
- In `renderSpeakers()`, when `speaker.headshotUrl` is set, render an `<img class="speaker-avatar" src="..." alt="">` instead of the initials div; otherwise keep current initials behavior.

---

## 3. Testimonials (real quotes)

**Where:** `index.html` — two `<blockquote class="testimonial-card">` elements in the `.social-proof` section (after the logo band). Current content is generic placeholder copy and attribution (“IT Leader, Enterprise”, “Operations Director, Mid-Market”).

**To-do:** Replace quote text and `<footer>` attribution with real customer testimonials and names/titles, or remove the testimonials block if not used.

---

## 4. Analytics wiring

**Where:** `script.js` — `trackEvent(name, payload)` currently only calls `console.debug("[analytics]", name, payload)`.

**To-do:** Connect to your analytics (e.g. GTM, Segment) inside `trackEvent()`. Use these for key events:

- CTA clicks: `[data-analytics="hero_request_session"]`, `nav_request_session`, `how_it_works_request_session`, `what_youll_learn_request_session`, `faq_request_session`, `footer_cta_request_session`
- Form: `form_submit` (button), and in code: `form_validation_error`, `form_submit_attempt`, `form_submit_success`, `form_submit_error`

---

## 5. FormSubmit.co first-use activation

**Not a code change.** FormSubmit.co sends an activation email to each address in `CONFIG.formNotifyEmails` on first submit. Prateek, Tanner, and Nick must each click the activation link once before submissions are delivered. After that, form submissions work as configured.

---

## 6. Optional: Backend / CRM

Form submissions are sent only via FormSubmit.co (AJAX to `https://formsubmit.co/ajax/{emails}`). There is no internal backend or CRM write.

**To-do (optional):** If you want submissions in a CRM or spreadsheet, either replace the FormSubmit.co fetch in `script.js` with your endpoint or add a serverless function that receives the same payload and forwards it.

---

## 7. Optional: Accessibility check

**To-do:** Run an accessibility pass (e.g. axe or Lighthouse) and fix any issues. Pay attention to color contrast (WCAG AA) for text and buttons; form fields already use `aria-invalid`, `aria-describedby`, and associated labels.
