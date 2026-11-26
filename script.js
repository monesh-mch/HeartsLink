
const templates = [
  {
    id: 1,
    name: "Will You Be Mine?",
    category: "proposal",
    emoji: "💍",
    art: "art-pink",
    description: "A beautiful interactive romantic proposal."
  },
  {
    id: 2,
    name: "Our Love Story",
    category: "story",
    emoji: "💑",
    art: "art-purple",
    description: "Create a timeline of your special memories."
  },
  {
    id: 3,
    name: "Birthday Surprise",
    category: "birthday",
    emoji: "🎂",
    art: "art-peach",
    description: "A sweet birthday surprise website."
  },
  {
    id: 4,
    name: "Secret Love Letter",
    category: "surprise",
    emoji: "💌",
    art: "art-blue",
    description: "A secret letter with a special reveal."
  },
  {
    id: 5,
    name: "Forever Together",
    category: "story",
    emoji: "❤️",
    art: "art-rose",
    description: "Celebrate your journey together."
  },
  {
    id: 6,
    name: "Open My Gift",
    category: "surprise",
    emoji: "🎁",
    art: "art-lavender",
    description: "A cute virtual gift-opening experience."
  }
];

const grid = document.getElementById("templateGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "all";

function renderTemplates() {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = templates.filter(item => {
    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(item => `
    <article class="template-card">
      <div class="template-art ${item.art}">
        <span>${item.emoji}</span>
      </div>
      <div class="card-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="card-bottom">
          <span class="tag">${item.category}</span>
          <button class="preview-btn"
            data-id="${item.id}">Preview ↗</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyMessage.hidden = filtered.length !== 0;
}

filters.addEventListener("click", event => {
  const button = event.target.closest(".filter");
  if (!button) return;

  selectedCategory = button.dataset.category;

  document.querySelectorAll(".filter").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");
  renderTemplates();
});

searchInput.addEventListener("input", renderTemplates);

const modal = document.getElementById("previewModal");
const previewContent = document.getElementById("previewContent");

grid.addEventListener("click", event => {
  const button = event.target.closest(".preview-btn");
  if (!button) return;

  const item = templates.find(
    template => template.id === Number(button.dataset.id)
  );

  if (!item) return;

  previewContent.innerHTML = `
    <div style="font-size:65px">${item.emoji}</div>
    <h2>${item.name}</h2>
    <p>${item.description}</p>
    <p>Coming soon! Customize and publish your own version. 💗</p>
  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
});

function closePreview() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

document.getElementById("closeModal")
  .addEventListener("click", closePreview);

modal.addEventListener("click", event => {
  if (event.target === modal) closePreview();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePreview();
});

// Light and Dark mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");
  themeBtn.textContent = darkMode ? "☀️" : "🌙";
});

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.textContent =
    navLinks.classList.contains("open") ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// Initial load
renderTemplates();
