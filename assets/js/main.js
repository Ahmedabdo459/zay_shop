// Fallback search items for when no .search-item elements are present in the DOM
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

// Simple mock function for adding items to cart.
// In a real application, this would involve managing a cart state (e.g., in localStorage or a backend).
function addToCart(productName, price, image, description) {
  let cartCount = parseInt(document.getElementById("cartCount").textContent);
  cartCount++;
  document.getElementById("cartCount").textContent = cartCount;
  alert(`${productName} added to cart! Price: $${price.toFixed(2)}`);
  console.log({ productName, price, image, description });
  // Here you would add logic to actually store the item in a cart array/object
}

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
});

  // Toggle mobile menu visibility when the hamburger icon is clicked
  // if (btn && menu) {
  //   btn.addEventListener("click", () => {
  //     menu.classList.toggle("hidden");
  //   });
  // }

  // Set active class for navigation links
  const setActiveLink = (target) => {
    navLinks.forEach((link) => link.classList.remove("active"));
    target.classList.add("active");
  };

  // Add click event listeners to navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveLink(link);
      // Hide mobile menu if a link inside it is clicked
      if (menu && menu.contains(link)) {
        menu.classList.add("hidden");
      }
    });
  });

  // Add 'scrolled' class to navbar on scroll for styling
  if (nav) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY > 10;
      nav.classList.toggle("scrolled", scrolled);
    });
  }

  // Search Overlay Elements
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const searchClose = document.getElementById("searchClose");
  const searchSubmit = document.getElementById("searchSubmit");
  // Select all elements that trigger the search overlay (desktop and mobile)
  const searchTriggers = document.querySelectorAll(
    "[data-action='open-search'], [data-action='open-search-mobile']"
  );
  let cachedSearchItems = []; // Cache for search items to avoid repeated DOM queries

  // Function to build the search index from DOM elements and fallback items
  const buildSearchIndex = () => {
    const domItems = Array.from(document.querySelectorAll(".search-item")).map((el) => ({
      name: el.dataset.name || el.textContent.trim(),
      description: el.dataset.description || "",
      link: el.dataset.link || "#",
    }));

    // If no search-item elements are found, use only the fallback items
    if (!domItems.length) {
      return fallbackSearchItems;
    }

    // Merge DOM items with fallback items, prioritizing DOM items and removing duplicates
    const seen = new Set();
    const merged = [];

    [...domItems, ...fallbackSearchItems].forEach((item) => {
      const key = item.name.toLowerCase();
      if (seen.has(key)) return; // Skip if already added

      seen.add(key);
      merged.push(item);
    });

    return merged;
  };

  // Function to render search results based on the query
  const renderSearchResults = (query = "") => {
    if (!searchResults) return; // Exit if searchResults element is not found

    // Build search index only once or if it's empty
    if (!cachedSearchItems.length) {
      cachedSearchItems = buildSearchIndex();
    }

    const normalizedQuery = query.trim().toLowerCase();
    let filtered = cachedSearchItems;

    // Filter items if a query is provided
    if (normalizedQuery) {
      filtered = cachedSearchItems.filter(
        (item) =>
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.description.toLowerCase().includes(normalizedQuery)
      );
    }

    // Display a message if no matches are found
    if (!filtered.length) {
      searchResults.innerHTML = `<p class="text-red-500 text-sm">No matches found for “${query}”. Try another keyword.</p>`;
      return;
    }

    // Render the filtered results
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

  // Function to open the search overlay
  const openSearch = () => {
    if (!searchOverlay) return; // Exit if searchOverlay element is not found
    searchOverlay.classList.remove("hidden");
    searchOverlay.classList.add("flex");
    if (searchInput) {
      searchInput.value = ""; // Clear previous search input
      setTimeout(() => searchInput.focus(), 100); // Focus on input after a short delay
    }
    renderSearchResults(); // Render all items initially
  };

  // Function to close the search overlay
  const closeSearch = () => {
    if (!searchOverlay) return; // Exit if searchOverlay element is not found
    searchOverlay.classList.add("hidden");
    searchOverlay.classList.remove("flex");
  };

  // Event listeners for opening the search overlay
  searchTriggers.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default button action
      openSearch();
    })
  );

  // Event listener for closing the search overlay
  if (searchClose) {
    searchClose.addEventListener("click", closeSearch);
  }

  // Close search overlay if clicking outside the content
  if (searchOverlay) {
    searchOverlay.addEventListener("click", (event) => {
      if (event.target === searchOverlay) {
        closeSearch();
      }
    });
  }

  // Event listener for submitting the search form (e.g., pressing Enter or clicking search button)
  if (searchSubmit) {
    searchSubmit.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default form submission
      renderSearchResults(searchInput ? searchInput.value : "");
    });
  }

  // Event listener for input changes to dynamically update search results
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      renderSearchResults(event.target.value);
    });
  }

  // Close search overlay if a search result link is clicked
  if (searchResults) {
    searchResults.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link) {
        closeSearch();
      }
    });
  }

  // Close search overlay on Escape key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
    }
  });
});