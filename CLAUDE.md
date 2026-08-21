# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build product catalog page (Romanian) for a hydraulic-parts shop, listing items such as
valves, couplings, PTOs, pumps, and manifolds — several from the Turkish manufacturer Hipomak. It's plain
HTML/CSS/vanilla JS with no package.json, build tooling, or test suite.

## Running locally

There is no dev server or build step. Open `index.html` directly in a browser, or serve the directory:

```
python3 -m http.server 8000
```

## Architecture

- `index.html` — page shell only (header/search box, filter bar, empty-state message, footer). Loads
  `js/products.js` then `js/app.js` at the end of `<body>`.
- `js/products.js` — the entire product catalog as a hardcoded `PRODUCTS` array of objects
  (`id`, `name`, `category`, `code`, `price`, `image`, `tags`, optional `hipomak: true`), plus
  `CATEGORY_LABELS` mapping category keys (e.g. `robinete`, `mufe`, `pto`) to Romanian display names.
  This is the only place product data lives — there is no backend or data file elsewhere.
- `js/app.js` — an IIFE that renders the catalog client-side: builds category filter buttons from
  `CATEGORY_LABELS`, filters `PRODUCTS` by active category and the search box's text (matched against
  name, code, and tags), and re-renders a grouped grid of cards on every filter/search change. Category
  section order follows `Object.keys(CATEGORY_LABELS)` order, not array order in `PRODUCTS`.
- `css/style.css` — all styling, including light/dark theming via CSS custom properties (`:root`,
  `prefers-color-scheme: dark`, and `[data-theme]` overrides for explicit toggling).
- `images/` — product photos referenced by filename from `PRODUCTS[].image`; several images are shared
  across multiple product entries (e.g. all three `robinete-3cai` variants use the same photo).

## Data notes (from the in-page notice)

Prices and names come directly from in-store shelf labels. Products tagged `Hipomak` (rendered with a
distinct red "hipomak" tag style) are visually identified as Hipomak Hydraulic products, but their exact
Hipomak catalog codes are unconfirmed since the manufacturer's site/PDF catalog wasn't accessible when the
data was entered — see the comment at the top of `js/products.js` and the notice box in `index.html`.
When adding or editing Hipomak items, keep this uncertainty in mind rather than inventing catalog codes.

## Adding/editing products

Edit the `PRODUCTS` array in `js/products.js` directly — add an object with the same shape as existing
entries. To add a new category, add an entry to `CATEGORY_LABELS` (this also drives filter button
generation and section ordering in `js/app.js`) and place its images in `images/`.
