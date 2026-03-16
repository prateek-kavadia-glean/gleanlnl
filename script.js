// Configuration for city, dates, contact, speakers, and behavior.
// Non-technical teammates can safely edit values in CONFIG.
const CONFIG = {
  cityRegion: "San Francisco Bay Area",
  availabilityWindow: "the week of {{DATE_RANGE}}",
  formatSummary: "On-site AI strategy sessions: breakfast, lunch, or coffee",
  responseSLA: "2 business days",
  contactEmail: "events@glean.com",
  internalNotifyEmail: "onsite-ai-sessions@glean.com", // used server-side
  speakers: [
    {
      name: "{{SPEAKER_NAME_1}}",
      title: "Solutions Engineer, Glean",
      initialsFallback: "SE",
      bio: "Works with leading enterprises to design and deploy AI-driven workflows across engineering, IT, and business teams."
    },
    {
      name: "{{SPEAKER_NAME_2}}",
      title: "Customer Strategy Lead, Glean",
      initialsFallback: "CS",
      bio: "Partners with customers on AI roadmaps that balance quick wins with long-term governance, security, and change management."
    },
    {
      name: "{{SPEAKER_NAME_3}}",
      title: "Work AI Specialist, Glean",
      initialsFallback: "AI",
      bio: "Helps organizations translate AI trends into practical agents, automations, and cross-functional use cases."
    }
  ]
};

// --- Helpers -------------------------------------------------------------

function applyConfigText() {
  const mapping = {
    cityRegion: CONFIG.cityRegion,
    availabilityWindow: CONFIG.availabilityWindow,
    formatSummary: CONFIG.formatSummary,
    responseSLA: CONFIG.responseSLA
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

function trackEvent(name, payload = {}) {
  // Hook up your analytics provider here (e.g., gtag, Segment, etc.)
  // Example:
  // window.gtag && window.gtag('event', name, payload);
  if (window.console && console.debug) {
    console.debug("[analytics]", name, payload);
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

  // Analytics hooks
  document
    .querySelectorAll("[data-analytics]")
    .forEach((el) => {
      el.addEventListener("click", () => {
        const eventName = el.getAttribute("data-analytics");
        if (eventName) {
          trackEvent(eventName);
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

    const data = {
      fullName: form.fullName.value.trim(),
      workEmail: form.workEmail.value.trim(),
      company: form.company.value.trim(),
      jobTitle: form.jobTitle.value.trim(),
      officeLocation: form.officeLocation.value.trim(),
      preferredFormat: form.preferredFormat.value,
      otherFormatDetails: form.otherFormatDetails.value.trim(),
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
      trackEvent("form_validation_error");
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

    trackEvent("form_submit_attempt");

    try {
      // Replace `/api/onsite-ai-session-requests` with your real endpoint.
      // The backend should:
      //  - Append to "On-site AI Session Requests" tracker
      //  - Send internal notification to CONFIG.internalNotifyEmail
      //  - Send confirmation email using confirmationEmail.bodyTemplate
      const response = await fetch(
        "/api/onsite-ai-session-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      trackEvent("form_submit_success", {
        company: data.company,
        cityRegion: CONFIG.cityRegion
      });

      // Clear form and show success inline
      form.reset();
      otherFormatGroup.hidden = true;

      successMessage.textContent =
        "Thanks for requesting an on-site AI session. We’ve received your request and our team will follow up shortly to schedule a brief prep conversation with your champion and confirm timing for your on-site session. For anything urgent, reach us at " +
        (CONFIG.contactEmail || "events@glean.com") +
        ".";

      errorSummary.textContent = "";
    } catch (err) {
      console.error(err);
      errorSummary.textContent =
        "Something went wrong while submitting your request. Please try again, or reach out directly at " +
        (CONFIG.contactEmail || "events@glean.com") +
        ".";
      trackEvent("form_submit_error");
    }
  });
}

// --- Init ----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  applyConfigText();
  configureContactLink();
  initNavToggle();
  renderSpeakers();
  initForm();
});
