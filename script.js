const grid = document.querySelector("#testimonial-grid");
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

function cardClass(item) {
  return ["testimonial-card", item.strength ? `is-${item.strength}` : ""]
    .filter(Boolean)
    .join(" ");
}

function renderGrid() {
  grid.innerHTML = testimonials
    .map(
      (item) => `
        <article class="${cardClass(item)}" tabindex="0">
          <p>“${item.isExcerpt ? `${item.quote} ...` : item.quote}”</p>
          <div class="card-meta">
            <span class="year-pill">${item.year}</span>
            <span class="card-context">${contextParts(item, "card").join(" · ")}</span>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll(".testimonial-card").forEach((card, index) => {
    const selectCard = () => {
      activeIndex = index;
      renderSpotlight();
      restartRotation();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    card.addEventListener("click", selectCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCard();
      }
    });
  });
}

function renderPage() {
  activeIndex = 0;
  renderSpotlight();
  renderGrid();
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
