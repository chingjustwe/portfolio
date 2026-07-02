<div align="center">
  <h2>Portfolio · Rocky Chi</h2>
  <p><a href="https://chingjustwe.github.io/portfolio/" target="_blank">chingjustwe.github.io/portfolio</a></p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/vanilla-js-f7df1e?style=flat-square&logo=javascript" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/no--build-✓-22c55e?style=flat-square" alt="No build" />
  <img src="https://img.shields.io/badge/i18n-zh_|_en-3b82f6?style=flat-square" alt="Bilingual" />
  <img src="https://img.shields.io/badge/themes-2-a78bfa?style=flat-square" alt="2 themes" />
</p>

---

## About

Personal resume site for **Rocky Chi** — Java Architect / AI Engineer. Highlights career timeline, featured projects, and technical competencies.

## Built With

- **Vanilla JavaScript** — no framework, no build step
- **Tailwind CSS** — utility-first styling via CDN
- **Chart.js** — radar chart for skill visualization
- **Prism.js** — syntax highlighting for code samples
- **GitHub Pages** — zero-config static hosting

## Features

**🗣  Bilingual** — zh-CN / English, toggled on the fly<br/>
**🎨  Two Themes** — glassmorphism ("Original") and warm paper ("Editorial")<br/>
**🌓  Dark / Light** — respects system preference, persisted in localStorage<br/>
**📖  Project Modals** — detailed slides per project with architecture diagrams<br/>
**📱  Slide Mode** — section-by-section navigation via keyboard (`P`, `↑`/`↓`, `Esc`)<br/>
**🔍  Zoomable Diagrams** — Ctrl+/- to zoom architecture slides<br/>
**📊  Skill Radar** — interactive Chart.js radar + animated progress bars

## Getting Started

No installation needed. This is a pure static site.

```bash
# Option 1: serve locally
npx serve src

# Option 2: Python
python3 -m http.server 8080 -d src

# Option 3: just open the file
open src/index.html
```

### Structure

```
src/
├── index.html            # Entry point
├── css/
│   └── style.css         # All custom CSS
├── js/
│   ├── i18n.js           # i18n dictionary (zh ↔ en)
│   ├── data.js           # Resume data (bilingual)
│   └── core.js           # Portfolio engine (render, modal, slides, chart)
├── theme/
│   ├── theme-original.js     # Glassmorphism theme
│   └── theme-editorial.js    # Warm paper theme
└── images/
    └── link.jpg          # Avatar / OG image
```

JS load order: `js/i18n.js → js/data.js → js/core.js → theme/*.js → Portfolio.init()`

## Deployment

Push to `main` triggers GitHub Actions → GitHub Pages. No build step — `src/` is uploaded as-is.

```bash
git add .
git commit -m "..."
git push origin main
```

The site will be live at `https://chingjustwe.github.io/portfolio/`.

## Customization

- **Text / data** → edit `data.js` (both `zh` and `en` blocks)
- **UI labels** → edit `i18n.js` (`dict.zh` / `dict.en`)
- **Layout / styling** → edit theme files or `index.html` CSS variables
- **Always update both themes** when adding DOM elements or interactions

## License

This project is open source for learning and reference. Built with care & vanilla JS.
