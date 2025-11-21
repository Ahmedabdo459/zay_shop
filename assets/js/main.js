const fallbackSearchItems = [
  {
    name: "Classic Watch Collection",
    description: "Luxury automatic and quartz watches curated from top designers.",
    link: "shop.html",
  },
  {
    name: "Performance Sneakers",
    description: "Lightweight trainers engineered for movement and breathability.",
    link: "shop.html",
  },
  {
    name: "Artisan Accessories",
    description: "Handcrafted jewelry, belts, and small leather goods.",
    link: "shop.html",
  },
  {
    name: "Leather Gym Duffel",
    description: "Full-grain leather gym bag with ventilated shoe pocket.",
    link: "shop.html",
  },
  {
    name: "City Runner Sneakers",
    description: "Featherweight knit sneakers for daily runs.",
    link: "shop.html",
  },
  {
    name: "Summer Canvas Trainers",
    description: "Breathable canvas trainers with contrast trims.",
    link: "shop.html",
  },
  {
    name: "Gym Weight Set",
    description: "Adjustable dumbbells and weight plates for strength training.",
    link: "shop.html",
  },
  {
    name: "Streetwear Sneakers",
    description: "Chunky sole sneaker with suede overlays.",
    link: "shop.html",
  },
  {
    name: "Summer Adidas Sneakers",
    description: "Retro Adidas sneakers with breathable mesh.",
    link: "shop.html",
  },
  {
    name: "Smart Fitness Watch",
    description: "AMOLED fitness watch with heart rate tracking.",
    link: "shop.html",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }

  const setActiveLink = (target) => {
    navLinks.forEach((link) => link.classList.remove("active"));
    target.classList.add("active");
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveLink(link);
      if (menu && menu.contains(link)) {
        menu.classList.add("hidden");
      }
    });
  });

  if (nav) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY > 10;
      nav.classList.toggle("scrolled", scrolled);
    });
  }

  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const searchClose = document.getElementById("searchClose");
  const searchSubmit = document.getElementById("searchSubmit");
  const searchTriggers = document.querySelectorAll("[data-action='open-search']");
  let cachedSearchItems = [];

  const buildSearchIndex = () => {
    const domItems = Array.from(document.querySelectorAll(".search-item")).map((el) => ({
      name: el.dataset.name || el.textContent.trim(),
      description: el.dataset.description || "",
      link: el.dataset.link || "#",
    }));

    if (!domItems.length) {
      return fallbackSearchItems;
    }

    const seen = new Set();
    const merged = [];

    [...domItems, ...fallbackSearchItems].forEach((item) => {
      const key = item.name.toLowerCase();
      if (seen.has(key)) return;

      seen.add(key);
      merged.push(item);
    });

    return merged;
  };

  const renderSearchResults = (query = "") => {
    if (!searchResults) return;

    if (!cachedSearchItems.length) {
      cachedSearchItems = buildSearchIndex();
    }

    const normalizedQuery = query.trim().toLowerCase();
    let filtered = cachedSearchItems;

    if (normalizedQuery) {
      filtered = cachedSearchItems.filter(
        (item) =>
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.description.toLowerCase().includes(normalizedQuery)
      );
    }

    if (!filtered.length) {
      searchResults.innerHTML = `<p class="text-red-500 text-sm">No matches found for “${query}”. Try another keyword.</p>`;
      return;
    }

    searchResults.innerHTML = filtered
      .map(
        (item) => `
          <a href="${item.link}" class="block border border-gray-200 rounded-xl p-4 hover:border-green-600 hover:bg-green-50 transition">
            <h4 class="text-lg font-semibold text-gray-900">${item.name}</h4>
            <p class="text-sm text-gray-600 mt-1">${item.description}</p>
          </a>
        `
      )
      .join("");
  };

  const openSearch = () => {
    if (!searchOverlay) return;
    searchOverlay.classList.remove("hidden");
    searchOverlay.classList.add("flex");
    if (searchInput) {
      searchInput.value = "";
      setTimeout(() => searchInput.focus(), 100);
    }
    renderSearchResults();
  };

  const closeSearch = () => {
    if (!searchOverlay) return;
    searchOverlay.classList.add("hidden");
    searchOverlay.classList.remove("flex");
  };

  searchTriggers.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      openSearch();
    })
  );

  if (searchClose) {
    searchClose.addEventListener("click", closeSearch);
  }

  if (searchOverlay) {
    searchOverlay.addEventListener("click", (event) => {
      if (event.target === searchOverlay) {
        closeSearch();
      }
    });
  }

  if (searchSubmit) {
    searchSubmit.addEventListener("click", (event) => {
      event.preventDefault();
      renderSearchResults(searchInput ? searchInput.value : "");
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      renderSearchResults(event.target.value);
    });
  }

  if (searchResults) {
    searchResults.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link) {
        closeSearch();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
    }
  });
});

