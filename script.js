const grid = document.querySelector("#testimonial-grid");
const quote = document.querySelector("#spotlight-quote");
const meta = document.querySelector("#spotlight-meta");
const previousButton = document.querySelector("#previous-testimonial");
const nextButton = document.querySelector("#next-testimonial");
const filterButtons = document.querySelectorAll(".filter-button");

let testimonials = [];
let activeFilter = "all";
let activeIndex = 0;

function visibleTestimonials() {
  return activeFilter === "all"
    ? testimonials
    : testimonials.filter((item) => item.year === activeFilter);
}

function contextParts(item, detail = "spotlight") {
  const parts =
    detail === "card"
      ? [item.experience, item.role, item.region]
      : [item.year, item.experience, item.role, item.region];
  return parts.filter(Boolean);
}

function renderSpotlight() {
  const visible = visibleTestimonials();
  if (!visible.length) return;
  const item = visible[activeIndex % visible.length];
  quote.textContent = item.isExcerpt ? `${item.quote} ...` : item.quote;
  meta.textContent = contextParts(item).join(" · ");
}

function cardClass(item) {
  return ["testimonial-card", item.strength ? `is-${item.strength}` : ""]
    .filter(Boolean)
    .join(" ");
}

function renderGrid() {
  const visible = visibleTestimonials();
  grid.innerHTML = visible
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

function setFilter(filter) {
  activeFilter = filter;
  activeIndex = 0;
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });
  renderSpotlight();
  renderGrid();
}

previousButton.addEventListener("click", () => {
  const visible = visibleTestimonials();
  activeIndex = (activeIndex - 1 + visible.length) % visible.length;
  renderSpotlight();
});

nextButton.addEventListener("click", () => {
  const visible = visibleTestimonials();
  activeIndex = (activeIndex + 1) % visible.length;
  renderSpotlight();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

async function init() {
  const response = await fetch("data/testimonials.json");
  testimonials = await response.json();
  setFilter("all");
}

init().catch(() => {
  quote.textContent = "Reflections are unavailable right now.";
  meta.textContent = "Please try again after the page reloads.";
});
