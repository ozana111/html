(function () {
  const grid = document.getElementById("catalog");
  const searchInput = document.getElementById("search");
  const filterBar = document.getElementById("category-filters");
  const emptyState = document.getElementById("empty-state");
  const resultsCount = document.getElementById("results-count");
  const sortSelect = document.getElementById("sort");
  const resetBtn = document.getElementById("reset-filters");

  const categoryOrder = Object.keys(CATEGORY_LABELS);
  let activeCategory = "all";
  let query = "";
  let sortMode = "default";

  function fmtPrice(n) {
    return n.toLocaleString("ro-RO") + " lei";
  }

  function matches(product) {
    if (activeCategory !== "all" && product.category !== activeCategory) return false;
    if (!query) return true;
    const haystack = (product.name + " " + product.code + " " + (product.tags || []).join(" ")).toLowerCase();
    return haystack.includes(query);
  }

  function sortItems(items) {
    const sorted = items.slice();
    if (sortMode === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortMode === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortMode === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name, "ro"));
    return sorted;
  }

  function render() {
    grid.innerHTML = "";
    let anyVisible = false;
    let totalCount = 0;

    categoryOrder.forEach((cat) => {
      const items = sortItems(PRODUCTS.filter((p) => p.category === cat && matches(p)));
      if (items.length === 0) return;
      anyVisible = true;
      totalCount += items.length;

      const section = document.createElement("section");
      section.className = "category";
      section.innerHTML = `<h2>${CATEGORY_LABELS[cat]}</h2>`;

      const cardsWrap = document.createElement("div");
      cardsWrap.className = "grid";

      items.forEach((p) => {
        const card = document.createElement("article");
        card.className = "card";

        const tags = (p.tags || [])
          .map((t) => `<span class="tag${t === "Hipomak" ? " hipomak" : ""}">${t}</span>`)
          .join("");

        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="card-body">
            <h3>${p.name}</h3>
            ${p.code ? `<div class="card-code">Cod: ${p.code}</div>` : ""}
            ${tags ? `<div class="card-tags">${tags}</div>` : ""}
            <div class="price">${fmtPrice(p.price)} <small>TVA inclus</small></div>
          </div>
        `;
        cardsWrap.appendChild(card);
      });

      section.appendChild(cardsWrap);
      grid.appendChild(section);
    });

    emptyState.style.display = anyVisible ? "none" : "block";
    resultsCount.textContent = anyVisible
      ? `${totalCount} produs${totalCount === 1 ? "" : "e"} găsit${totalCount === 1 ? "" : "e"}`
      : "";
  }

  function buildFilters() {
    const allBtn = document.createElement("button");
    allBtn.textContent = "Toate";
    allBtn.className = "active";
    allBtn.addEventListener("click", () => setActive("all", allBtn));
    filterBar.appendChild(allBtn);

    categoryOrder.forEach((cat) => {
      const btn = document.createElement("button");
      btn.textContent = CATEGORY_LABELS[cat];
      btn.addEventListener("click", () => setActive(cat, btn));
      filterBar.appendChild(btn);
    });
  }

  function setActive(cat, btnEl) {
    activeCategory = cat;
    filterBar.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    btnEl.classList.add("active");
    render();
  }

  searchInput.addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    render();
  });

  sortSelect.addEventListener("change", (e) => {
    sortMode = e.target.value;
    render();
  });

  resetBtn.addEventListener("click", () => {
    query = "";
    sortMode = "default";
    searchInput.value = "";
    sortSelect.value = "default";
    filterBar.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    filterBar.firstElementChild.classList.add("active");
    activeCategory = "all";
    render();
  });

  buildFilters();
  render();
})();
