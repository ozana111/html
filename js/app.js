(function () {
  const grid = document.getElementById("catalog");
  const searchInput = document.getElementById("search");
  const filterBar = document.getElementById("category-filters");
  const emptyState = document.getElementById("empty-state");

  const categoryOrder = Object.keys(CATEGORY_LABELS);
  let activeCategory = "all";
  let query = "";

  function fmtPrice(n) {
    return n.toLocaleString("ro-RO") + " lei";
  }

  function matches(product) {
    if (activeCategory !== "all" && product.category !== activeCategory) return false;
    if (!query) return true;
    const haystack = (product.name + " " + product.code + " " + (product.tags || []).join(" ")).toLowerCase();
    return haystack.includes(query);
  }

  function render() {
    grid.innerHTML = "";
    let anyVisible = false;

    categoryOrder.forEach((cat) => {
      const items = PRODUCTS.filter((p) => p.category === cat && matches(p));
      if (items.length === 0) return;
      anyVisible = true;

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

  buildFilters();
  render();
})();
