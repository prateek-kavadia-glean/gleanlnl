// Configuration for city, dates, contact, speakers, and behavior.
// Non-technical teammates can safely edit values in CONFIG.
// Can be moved to a JSON file or per-region override later (e.g. NYC, Austin).
const CONFIG = {
  // Region & date window (single source of truth for copy)
  region: "San Francisco Bay Area",
  cityRegion: "San Francisco Bay Area", // alias for data-config-text
  availabilityWindow: "March 30–April 3, 2026",
  formatSummary: "Lunch and Learn (breakfast, lunch, or coffee)",
  heroEyebrow: "SF Bay Area • March 30–April 3, 2026",

  // SLA (business days to first response)
  responseSLA: "2 business days",
  responseSLABusinessDays: 2,

  // Session timing
  prepDuration: "30–45 minute",
  sessionDuration: "60–90 minutes",

  // Contact & form routing
  contactEmail: "prateek.kavadia@glean.com",
  internalNotifyEmail: "onsite-ai-sessions@glean.com",
  formNotifyEmails: "prateek.kavadia@glean.com,tanner.cherry@glean.com,nick.devito@glean.com",

  // Preferred date options for form dropdown (March 30 - April 3, 2026)
  preferredDateOptions: [
    { value: "Monday, March 30", label: "Monday, March 30" },
    { value: "Tuesday, March 31", label: "Tuesday, March 31" },
    { value: "Wednesday, April 1", label: "Wednesday, April 1" },
    { value: "Thursday, April 2", label: "Thursday, April 2" },
    { value: "Friday, April 3", label: "Friday, April 3" }
  ],

  speakers: [
    {
      name: "Prateek Kavadia",
      title: "Solutions Engineer, Glean",
      initialsFallback: "PK",
      bio: "Focused on practical technical validation, live demos, and helping teams connect AI strategy to real workflows. Part of the Corporate Solutions Engineering team."
    },
    {
      name: "Tanner Cherry",
      title: "Solutions Engineer, Glean",
      initialsFallback: "TC",
      bio: "Partners with the Corporate team to run high-signal in-person sessions that feel practical and useful to the room. Brings Glean to life through tailored demos and use case discussions."
    }
  ],
  // Additional support (not listed as speaker; used in form routing and optional copy)
  additionalSupport: "Nick DeVito (Corporate Sales Director) and the Corporate team"
};

// Form endpoint: swap for Glean-owned endpoint or Marketo/HubSpot when ready.
// TODO: Wire Glean-owned form endpoint; add hidden fields for UTM params, campaignId, etc.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONFIG.formNotifyEmails}`;

// Testimonials: add real quotes here to render in #testimonials-container; leave empty to hide.
const TESTIMONIALS = [
  // { quote: "...", name: "...", title: "...", company: "..." },
];

// --- Helpers -------------------------------------------------------------

function applyConfigText() {
  const mapping = {
    cityRegion: CONFIG.cityRegion,
    availabilityWindow: CONFIG.availabilityWindow,
    formatSummary: CONFIG.formatSummary,
    responseSLA: CONFIG.responseSLA,
    heroEyebrow: CONFIG.heroEyebrow,
    prepDuration: CONFIG.prepDuration || "30–45 minute",
    sessionDuration: CONFIG.sessionDuration || "60–90 minutes"
  };

  document
    .querySelectorAll("[data-config-text]")
    .forEach((el) => {
      const key = el.getAttribute("data-config-text");
      if (key && Object.prototype.hasOwnProperty.call(mapping, key)) {
        el.textContent = mapping[key];
      }
    });
}

function configureContactLink() {
  const link = document.getElementById("contact-link");
  if (!link) return;
  const email = CONFIG.contactEmail || "events@glean.com";
  link.href = `mailto:${email}`;
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close nav when clicking a link (mobile)
  nav.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initialsFromName(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (!parts.length) return "";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

function renderSpeakers() {
  const grid = document.getElementById("speakers-grid");
  if (!grid || !Array.isArray(CONFIG.speakers)) return;
  grid.innerHTML = "";

  CONFIG.speakers.forEach((speaker) => {
    const card = document.createElement("article");
    card.className = "speaker-card";

    const header = document.createElement("div");
    header.className = "speaker-header";

    const avatar = document.createElement("div");
    avatar.className = "speaker-avatar";
    avatar.textContent =
      speaker.initialsFallback || initialsFromName(speaker.name);

    const meta = document.createElement("div");
    meta.className = "speaker-meta";

    const nameEl = document.createElement("div");
    nameEl.className = "speaker-name";
    nameEl.textContent = speaker.name || "{{SPEAKER_NAME}}";

    const titleEl = document.createElement("div");
    titleEl.className = "speaker-title";
    titleEl.textContent = speaker.title || "Glean";

    meta.appendChild(nameEl);
    meta.appendChild(titleEl);

    header.appendChild(avatar);
    header.appendChild(meta);

    const bio = document.createElement("p");
    bio.className = "speaker-bio";
    bio.textContent =
      speaker.bio ||
      "Works with customers to bring AI into everyday workflows in a secure and practical way.";

    card.appendChild(header);
    card.appendChild(bio);

    grid.appendChild(card);
  });
}

function renderTestimonials() {
  const container = document.getElementById("testimonials-container");
  if (!container || !Array.isArray(TESTIMONIALS) || TESTIMONIALS.length === 0) return;
  container.hidden = false;
  container.innerHTML = "";
  TESTIMONIALS.forEach((t) => {
    const blockquote = document.createElement("blockquote");
    blockquote.className = "testimonial-card";
    const p = document.createElement("p");
    p.textContent = t.quote;
    const footer = document.createElement("footer");
    footer.textContent = [t.name, t.title, t.company].filter(Boolean).join(", ");
    blockquote.appendChild(p);
    blockquote.appendChild(footer);
    container.appendChild(blockquote);
  });
}

function trackEvent(action, labelOrPayload = null, label = null) {
  const payload = typeof labelOrPayload === "object" && labelOrPayload !== null
    ? { ...labelOrPayload }
    : { label: label != null ? label : labelOrPayload };
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({
      event: "lnl_event",
      action: action,
      ...payload
    });
  }
  if (window.console && console.debug) {
    console.debug("[analytics] lnl_event", action, payload);
  }
}

// Basic email format validation
function isValidEmail(email) {
  if (!email) return false;
  const re =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function isFreeEmailDomain(email) {
  const freeDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "proton.me",
    "protonmail.com"
  ];
  const domain = String(email).split("@")[1]?.toLowerCase();
  return domain && freeDomains.includes(domain);
}

// Form handling
function initForm() {
  const form = document.getElementById("session-request-form");
  if (!form) return;

  const errorSummary = document.getElementById("form-error-summary");
  const successMessage = document.getElementById("form-success-message");
  const preferredFormatSelect = document.getElementById("preferredFormat");
  const otherFormatGroup = document.getElementById("otherFormatGroup");

  // Show/hide "Other" format text field
  preferredFormatSelect.addEventListener("change", () => {
    if (preferredFormatSelect.value === "Other") {
      otherFormatGroup.hidden = false;
    } else {
      otherFormatGroup.hidden = true;
    }
  });

  // Apply config to success card contact link
  const successContactLink = document.getElementById("form-success-contact-link");
  if (successContactLink && CONFIG.contactEmail) {
    successContactLink.href = `mailto:${CONFIG.contactEmail}`;
  }

  // Analytics: push lnl_event with action/label from data-analytics
  document
    .querySelectorAll("[data-analytics]")
    .forEach((el) => {
      el.addEventListener("click", () => {
        const action = el.getAttribute("data-analytics");
        if (action) {
          trackEvent(action, { label: action });
        }
      });
    });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorSummary.textContent = "";
    successMessage.textContent = "";

    // Clear field-level errors
    form
      .querySelectorAll("[data-error-for]")
      .forEach((el) => (el.textContent = ""));
    form
      .querySelectorAll("[data-warning-for]")
      .forEach((el) => (el.textContent = ""));
    form
      .querySelectorAll("input, textarea, select")
      .forEach((el) => el.removeAttribute("aria-invalid"));

    const preferredDateEl = form.querySelector("#preferredDate");
    const data = {
      fullName: form.fullName.value.trim(),
      workEmail: form.workEmail.value.trim(),
      company: form.company.value.trim(),
      jobTitle: form.jobTitle.value.trim(),
      officeLocation: form.officeLocation.value.trim(),
      preferredFormat: form.preferredFormat.value,
      otherFormatDetails: form.otherFormatDetails.value.trim(),
      preferredDate: preferredDateEl ? preferredDateEl.value.trim() : "",
      preferredDatesTimes: form.preferredDatesTimes.value.trim(),
      estimatedAttendees: form.estimatedAttendees.value,
      championContact: form.championContact.value.trim(),
      aiJourney: form.aiJourney.value.trim(),
      desiredOutcomes: form.desiredOutcomes.value.trim(),
      optIn: form.optIn.checked
    };

    const requiredFields = [
      "fullName",
      "workEmail",
      "company",
      "jobTitle",
      "officeLocation",
      "preferredFormat",
      "preferredDatesTimes"
    ];

    let hasError = false;

    // Required field validation
    requiredFields.forEach((fieldName) => {
      if (!data[fieldName]) {
        const errorEl = form.querySelector(
          `[data-error-for="${fieldName}"]`
        );
        if (errorEl) {
          errorEl.textContent =
            "This field is required.";
        }
        const inputEl = form.elements[fieldName];
        if (inputEl) {
          inputEl.setAttribute("aria-invalid", "true");
        }
        hasError = true;
      }
    });

    // Email validation
    if (data.workEmail && !isValidEmail(data.workEmail)) {
      const errorEl = form.querySelector(
        `[data-error-for="workEmail"]`
      );
      if (errorEl) {
        errorEl.textContent =
          "Please enter a valid email address.";
      }
      form.workEmail.setAttribute("aria-invalid", "true");
      hasError = true;
    } else if (
      data.workEmail &&
      isFreeEmailDomain(data.workEmail)
    ) {
      const warningEl = form.querySelector(
        `[data-warning-for="workEmail"]`
      );
      if (warningEl) {
        warningEl.textContent =
          "It looks like you’re using a personal email address. A company email can help us respond more quickly.";
      }
    }

    // Estimated attendees validation (optional numeric)
    if (data.estimatedAttendees) {
      const num = Number(data.estimatedAttendees);
      if (Number.isNaN(num) || num <= 0) {
        const errorEl = form.querySelector(
          `[data-error-for="estimatedAttendees"]`
        );
        if (errorEl) {
          errorEl.textContent =
            "Please enter a valid attendee count.";
        }
        form.estimatedAttendees.setAttribute(
          "aria-invalid",
          "true"
        );
        hasError = true;
      }
    }

    if (hasError) {
      errorSummary.textContent =
        "Please review the highlighted fields and try again.";
      trackEvent("form_validation_error", { label: "form_validation_error" });
      return;
    }

    // Build payload for backend / central tracker
    const payload = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName,
      workEmail: data.workEmail,
      company: data.company,
      jobTitle: data.jobTitle,
      officeLocation: data.officeLocation,
      preferredFormat:
        data.preferredFormat === "Other"
          ? `Other: ${data.otherFormatDetails || ""}`.trim()
          : data.preferredFormat,
      preferredDate: data.preferredDate || null,
      preferredDatesTimes: data.preferredDatesTimes,
      estimatedAttendees: data.estimatedAttendees || null,
      championContact: data.championContact || null,
      aiJourney: data.aiJourney || null,
      desiredOutcomes: data.desiredOutcomes || null,
      optIn: data.optIn,
      // Additional internal-only fields for routing
      cityRegion: CONFIG.cityRegion,
      availabilityWindow: CONFIG.availabilityWindow,
      internalNotifyEmail: CONFIG.internalNotifyEmail,
      // These are for your backend to construct internal + confirmation emails:
      confirmationEmail: {
        subject:
          "We’ve received your request for an on-site AI session",
        // Template body with placeholders for backend to fill in:
        bodyTemplate: [
          "Hi {{FIRST_NAME}},",
          "",
          "Thanks for requesting an on-site AI strategy session with Glean.",
          "",
          "Our next step is to schedule a short prep conversation with your internal champion so we can better understand your tools, workflows, and AI goals. From there, we’ll confirm the details for a breakfast, lunch, or coffee session at your office.",
          "",
          `You can expect to hear from us within ${CONFIG.responseSLA} to coordinate next steps.`,
          "",
          "In the meantime, feel free to learn more about Glean at https://www.glean.com/.",
          "",
          "Best,",
          "The Glean Team"
        ].join("\n")
      }
    };

    trackEvent("form_submit_attempt", { label: "form_submit_attempt" });

    try {
      // Payload structure: easy to swap to Marketo/HubSpot/Glean endpoint without changing validation.
      // TODO: Add hidden fields for UTM (utm_source, utm_medium, utm_campaign), campaignId, etc., when wiring to Glean endpoint.
      const formPayload = {
        _subject: `On-site AI Session Request - ${data.company}`,
        _template: "table",
        _captcha: "false",
        "Full name": data.fullName,
        "Work email": data.workEmail,
        Company: data.company,
        "Job title": data.jobTitle,
        "Office location": data.officeLocation,
        "Preferred format": data.preferredFormat === "Other" ? `Other: ${data.otherFormatDetails || ""}`.trim() : data.preferredFormat,
        "Preferred date": data.preferredDate || "",
        "Preferred dates/times": data.preferredDatesTimes,
        "Estimated attendees": data.estimatedAttendees || "",
        "Champion / main contact": data.championContact || "",
        "AI journey today": data.aiJourney || "",
        "Desired outcomes": data.desiredOutcomes || "",
        "Opt-in to updates": data.optIn ? "Yes" : "No",
        "Submitted at": payload.timestamp
      };

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formPayload)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      trackEvent("form_submit_success", {
        label: "form_submit_success",
        company: data.company,
        cityRegion: CONFIG.cityRegion
      });

      // Replace form with success card
      const formCard = document.getElementById("form-card-wrapper");
      const successCard = document.getElementById("form-success-card");
      if (formCard && successCard) {
        form.hidden = true;
        form.setAttribute("aria-hidden", "true");
        successCard.hidden = false;
        successCard.removeAttribute("hidden");
        // Re-apply config text for responseSLA in success card
        const slaEl = successCard.querySelector("[data-config-text='responseSLA']");
        if (slaEl) slaEl.textContent = CONFIG.responseSLA;
      }
      form.reset();
      otherFormatGroup.hidden = true;
      errorSummary.textContent = "";
    } catch (err) {
      console.error(err);
      errorSummary.textContent =
        "Something went wrong while submitting your request. Please try again, or reach out directly at " +
        (CONFIG.contactEmail || "events@glean.com") +
        ".";
      trackEvent("form_submit_error", { label: "form_submit_error" });
    }
  });
}

// --- Init ----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  applyConfigText();
  configureContactLink();
  initNavToggle();
  renderSpeakers();
  renderTestimonials();
  initForm();
});
