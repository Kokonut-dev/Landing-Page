(function () {
  const html = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const clockEl = document.getElementById("clock");
  const dateGreetingEl = document.getElementById("date-greeting");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const engineSelect = document.getElementById("engine-select");

  const ENGINES = {
    google: "https://www.google.com/search?q=",
    duckduckgo: "https://duckduckgo.com/?q=",
    github: "https://github.com/search?q=",
    youtube: "https://www.youtube.com/results?search_query="
  };

  // Theme persistence
  const savedTheme = localStorage.getItem("home-theme") || "dark";
  html.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("home-theme", next);
  });

  // Search engine persistence
  const savedEngine = localStorage.getItem("home-engine") || "google";
  if (ENGINES[savedEngine]) {
    engineSelect.value = savedEngine;
  }

  engineSelect.addEventListener("change", () => {
    localStorage.setItem("home-engine", engineSelect.value);
  });

  // Search submission
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;
    const baseUrl = ENGINES[engineSelect.value] || ENGINES.google;
    window.location.href = baseUrl + encodeURIComponent(query);
  });

  // Keyboard shortcuts: "/" to focus search, "Escape" to clear/blur
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      searchInput.blur();
    }
  });

  // Live clock & greeting
  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const displayHours = String(hours).padStart(2, "0");
    clockEl.textContent = `${displayHours}:${minutes}`;

    let greeting = "Good evening";
    if (hours < 12) greeting = "Good morning";
    else if (hours < 18) greeting = "Good afternoon";

    const dateStr = now.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
    dateGreetingEl.textContent = `${greeting} · ${dateStr}`;
  }

  updateClock();
  setInterval(updateClock, 1000 * 15);
})();
