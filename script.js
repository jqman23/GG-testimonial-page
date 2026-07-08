const quote = document.querySelector("#spotlight-quote");
const meta = document.querySelector("#spotlight-meta");
const spotlight = document.querySelector(".spotlight");

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
  const quoteText = item.isExcerpt ? `${item.quote} ...` : item.quote;
  spotlight.classList.remove("has-long-quote", "has-very-long-quote");
  if (quoteText.length > 245) {
    spotlight.classList.add("has-very-long-quote");
  } else if (quoteText.length > 170) {
    spotlight.classList.add("has-long-quote");
  }
  quote.textContent = quoteText;
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
