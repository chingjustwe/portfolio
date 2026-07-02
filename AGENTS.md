# Portfolio

Rocky Chi's personal resume site. Vanilla JS single-page application, no build tools.

## Getting Started

No installation or build step needed. Open `src/index.html` directly in a browser (use `npx serve src` or Python's `http.server` to avoid CDN cross-origin warnings).

## Source Structure

```
src/
├── index.html          # Entry point, loads all JS
├── css/
│   └── style.css       # All custom CSS (theme variables, utilities, animations)
├── js/
│   ├── i18n.js         # i18n (zh-CN / en)
│   ├── data.js         # All resume data (bilingual)
│   └── core.js         # Core: Portfolio object (render, modal, slides, radar chart)
├── theme/
│   ├── theme-original.js   # Theme: glassmorphism
│   └── theme-editorial.js  # Theme: warm paper print style
└── images/
    └── link.jpg        # Avatar / OG image
```

JS load order is strict: `js/i18n.js → js/data.js → js/core.js → theme/*.js`, then `Portfolio.init()`.

## Key Conventions

- **Entry point**: `<script>Portfolio.init();</script>` at bottom of `src/index.html`
- **No framework, no npm** — hand-written JS, no package.json, no lint/test/typecheck
- **CDN deps**: Tailwind (script tag), Chart.js, Prism.js — all in `index.html`
- **Theme registration**: `Portfolio.registerTheme(name, { renderHTML, afterRender })`
- **i18n**: `getData()` returns current language's data subset; UI text via `I18N.t('key')`
- **Modification: check both languages** — any change to text, data, or UI content must update both `zh` and `en` blocks in `data.js`, and the corresponding keys in `dict.zh` / `dict.en` in `i18n.js`
- **Modification: check both themes** — all themes share the same DOM structure and IDs. Adding/changing DOM elements or interaction logic must be handled in both `theme-original.js` and `theme-editorial.js`, and verified visually in both themes
- **Modification: check README** — when changing structure, features, commands, or anything a reader would rely on, update `README.md` accordingly
- **Persistence**: `localStorage` for `portfolio-style`, `portfolio-lang`, `theme`
- **Deploy**: GitHub Actions → GitHub Pages. Push to `main` triggers deploy. No build step — `src/` is uploaded as-is (pure static).
- **Remote**: `origin → git@github.com:chingjustwe/portfolio.git`
