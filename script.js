/**
 * Lunch & Learn microsite – CONFIG, theme toggle, nav, config text, speakers, testimonials.
 */

var THEME_KEY = "glean-site-theme";

var CONFIG = {
  cityRegion: "San Francisco Bay Area",
  availabilityWindow: "March 30–April 3, 2026",
  responseSLA: "2 business days",
  responseSLABusinessDays: 2,
  heroEyebrow: "SF Bay Area • March 30–April 3, 2026",
  prepDuration: "30–45 minute",
  sessionDuration: "60–90 minutes",
  typeformFormId: "",
  speakers: [
    { name: "Prateek Kavadia", title: "Solutions Engineering", bio: "" },
    { name: "Tanner Cherry", title: "Solutions Engineering", bio: "" },
    { name: "Nick DeVito", title: "Corporate Sales Director", bio: "" },
  ],
};

var TESTIMONIALS = [];

function getTheme() {
  var t = document.documentElement.getAttribute("data-theme");
  return t === "dark" || t === "light" ? t : "light";
}

function setTheme(next) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {}
  var btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("title", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
}

function initThemeToggle() {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var current = getTheme();
    var next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });
  var current = getTheme();
  btn.setAttribute("aria-label", current === "dark" ? "Switch to light theme" : "Switch to dark theme");
  btn.setAttribute("title", current === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

function applyConfig() {
  var keys = [
    "cityRegion",
    "availabilityWindow",
    "responseSLA",
    "heroEyebrow",
    "prepDuration",
    "sessionDuration",
  ];
  keys.forEach(function (key) {
    var val = CONFIG[key];
    if (val == null) return;
    document.querySelectorAll('[data-config-text="' + key + '"]').forEach(function (el) {
      el.textContent = val;
    });
  });
}

function renderSpeakers() {
  var grid = document.getElementById("speakers-grid");
  if (!grid || !CONFIG.speakers || !CONFIG.speakers.length) return;
  grid.innerHTML = CONFIG.speakers
    .map(function (s) {
      var initial = (s.name || "?").trim().charAt(0);
      return (
        '<article class="speaker-card">' +
        '<div class="speaker-header">' +
        '<span class="speaker-avatar" aria-hidden="true">' + initial + "</span>" +
        '<div class="speaker-meta">' +
        '<span class="speaker-name">' + (s.name || "") + "</span>" +
        '<span class="speaker-title">' + (s.title || "") + "</span>" +
        "</div>" +
        "</div>" +
        (s.bio ? '<p class="speaker-bio">' + s.bio + "</p>" : "") +
        "</article>"
      );
    })
    .join("");
}

function renderTestimonials() {
  var container = document.getElementById("testimonials-container");
  if (!container || !TESTIMONIALS || !TESTIMONIALS.length) return;
  container.hidden = false;
  container.innerHTML = TESTIMONIALS.map(function (t) {
    return (
      '<blockquote class="testimonial-card">' +
      "<p>" + (t.quote || "") + "</p>" +
      "<footer>" + (t.name || "") + (t.title ? ", " + t.title : "") + (t.company ? " — " + t.company : "") + "</footer>" +
      "</blockquote>"
    );
  }).join("");
}

function initNavToggle() {
  var btn = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function trackEvent(action, payload) {
  if (typeof window.dataLayer !== "undefined") {
    window.dataLayer.push({ event: "lnl_event", action: action, label: payload });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  applyConfig();
  renderSpeakers();
  renderTestimonials();
  initNavToggle();

  document.querySelectorAll("[data-analytics]").forEach(function (el) {
    el.addEventListener("click", function () {
      trackEvent(el.getAttribute("data-analytics"), (el.textContent || "").trim().slice(0, 80));
    });
  });
});
