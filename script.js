const testimonials = [
  {
    year: "2022",
    quote:
      "Hearing from the global community that we share the passion and willingness to evolve in child welfare.",
    source: "2022 feedback.xlsx",
  },
  {
    year: "2022",
    quote:
      "The conference was really amazing. Such an inspiring set of speakers and participants.",
    source: "2022 feedback.xlsx",
  },
  {
    year: "2022",
    quote:
      "I enjoyed listening to people from across the world speak about their experiences in other countries. It's a wonderful connection.",
    source: "2022 feedback.xlsx",
  },
  {
    year: "2022",
    quote:
      "Meeting and hearing from people from all over the world and learning about their work.",
    source: "2022 feedback.xlsx",
  },
  {
    year: "2023",
    quote:
      "The speed networking was the most positive experience. I had such fun and learned a great deal.",
    source: "2023 event feedback.xlsx",
  },
  {
    year: "2023",
    quote:
      "It was amazing to be part of a conference with individuals all over the world.",
    source: "2023 event feedback.xlsx",
  },
  {
    year: "2023",
    quote: "Learning child welfare services across the globe, networking opportunities.",
    source: "2023 event feedback.xlsx",
  },
  {
    year: "2023",
    quote:
      "Meeting people from Canada and the US doing such great work. Being in a very diverse audience.",
    source: "2023 event feedback.xlsx",
  },
  {
    year: "2024",
    quote:
      "I feel this is one of the best conferences I have attended. It helps me look at new views, new ways to practice, and I always learn something new.",
    source: "2024 event feedback.xlsx",
  },
  {
    year: "2024",
    quote:
      "An excellent conference with presenters with deep knowledge in their areas of expertise, including lived experience.",
    source: "2024 event feedback.xlsx",
  },
  {
    year: "2024",
    quote:
      "The combination of research, lived experience, and workers gave me hope for the future. I felt a sense of community.",
    source: "2024 event feedback.xlsx",
  },
  {
    year: "2024",
    quote:
      "Really enjoyed the opportunity to learn and hear from diverse perspectives around the world.",
    source: "2024 event feedback.xlsx",
  },
  {
    year: "2025",
    quote:
      "The variety of speakers and sessions globally provided a larger lens of the good work and changes occurring in child welfare.",
    source: "2025 event feedback.xlsx",
  },
  {
    year: "2025",
    quote:
      "I love the international scope of child welfare. I learned so much from both professionals and those with lived experience.",
    source: "2025 event feedback.xlsx",
  },
  {
    year: "2025",
    quote:
      "Loved the flexibility of the time, variety of topics, and connections worldwide. Overall, a very good experience.",
    source: "2025 event feedback.xlsx",
  },
  {
    year: "2025",
    quote: "Great substance, and I hope to see more next year from this standpoint.",
    source: "2025 event feedback.xlsx",
  },
];

const grid = document.querySelector("#testimonial-grid");
const quote = document.querySelector("#spotlight-quote");
const meta = document.querySelector("#spotlight-meta");
const previousButton = document.querySelector("#previous-testimonial");
const nextButton = document.querySelector("#next-testimonial");
const filterButtons = document.querySelectorAll(".filter-button");

let activeFilter = "all";
let activeIndex = 0;

function visibleTestimonials() {
  return activeFilter === "all"
    ? testimonials
    : testimonials.filter((item) => item.year === activeFilter);
}

function renderSpotlight() {
  const visible = visibleTestimonials();
  const item = visible[activeIndex % visible.length];
  quote.textContent = item.quote;
  meta.textContent = `Global Gathering attendee feedback, ${item.year}`;
}

function renderGrid() {
  const visible = visibleTestimonials();
  grid.innerHTML = visible
    .map(
      (item, index) => `
        <article class="testimonial-card">
          <p>"${item.quote}"</p>
          <div class="card-meta">
            <span class="year-pill">${item.year}</span>
            <span>Attendee feedback</span>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll(".testimonial-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      activeIndex = index;
      renderSpotlight();
      window.scrollTo({ top: 0, behavior: "smooth" });
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

setFilter("all");
