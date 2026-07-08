const quote = document.querySelector("#spotlight-quote");
const meta = document.querySelector("#spotlight-meta");

let testimonials = [];
let activeIndex = 0;
let rotationTimer;
const rotationDelay = 3000;

function contextParts(item, detail = "spotlight") {
  const parts =
    detail === "card"
      ? [item.experience, item.role, item.region]
      : [item.year, item.experience, item.role, item.region];
  return parts.filter(Boolean);
}

function renderSpotlight() {
  if (!testimonials.length) return;
  const item = testimonials[activeIndex % testimonials.length];
  quote.textContent = item.isExcerpt ? `${item.quote} ...` : item.quote;
  meta.textContent = contextParts(item).join(" · ");
}

function showNextReflection() {
  if (!testimonials.length) return;
  activeIndex = (activeIndex + 1) % testimonials.length;
  renderSpotlight();
}

function restartRotation() {
  window.clearInterval(rotationTimer);
  rotationTimer = window.setInterval(showNextReflection, rotationDelay);
}

function renderPage() {
  activeIndex = 0;
  renderSpotlight();
  restartRotation();
}

async function init() {
  const response = await fetch("data/testimonials.json");
  testimonials = await response.json();
  renderPage();
}

init().catch(() => {
  quote.textContent = "Reflections are unavailable right now.";
  meta.textContent = "Please try again after the page reloads.";
});
