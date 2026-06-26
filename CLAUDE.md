# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal resume/portfolio site for CloverCLC, deployed on GitHub Pages at `https://cloverclc.github.io`. Single static page — plain HTML/CSS/JS, no framework, no build step.

## Commands

```bash
python -m http.server 8080    # Local preview, then open http://localhost:8080

git push                      # Push to main → GitHub Pages auto-deploys within ~2 min
```

## Architecture

```
index.html          # Single-page app, all sections in one file
css/style.css       # Design tokens (:root), dark mode (@media prefers-color-scheme), responsive
js/main.js          # Nav scroll highlight + IntersectionObserver scroll reveal
```

### CSS: Design Token System

All colors defined as CSS custom properties on `:root` (light) and overridden in `@media (prefers-color-scheme: dark)`. Never hardcode a color — always use `var(--token)`.

Key tokens: `--bg`, `--bg-alt`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-muted`, `--border`, `--border-hover`, `--accent`, `--accent-bg`, `--card-bg`, `--card-shadow`, `--tag-bg`, `--tag-color`, `--btn-*`, `--nav-bg`.

### Icons: SVG `<defs>` + `<use>`

Two icons defined once in a hidden `<svg>` at the top of `<body>`:
- `#icon-github-path` — GitHub Octocat mark
- `#icon-mail-path` — GitHub Octicons mail

Usage: `<svg class="icon-github" viewBox="0 0 24 24" fill="currentColor"><use href="#icon-github-path"/></svg>`

Sized via CSS: `.icon-github, .icon-mail { width: 1em; height: 1em; }` inherits `font-size` from parent context.

### JS: No Framework

Two IIFE modules:
1. **Nav highlight** — `scroll` event (passive) updates active link color
2. **Scroll reveal** — `IntersectionObserver` adds `.visible` class to `.reveal` and `.reveal-stagger > *` elements. Gated on `prefers-reduced-motion`.

### Design Constraints

Site follows `design-taste-frontend` skill rules:
- No emoji anywhere on the page
- No em-dashes (`—`) — use comma or period instead
- No AI-purple gradients, no glassmorphism, no fake screenshots
- No scroll cues, no version labels, no locale/time/weather strips
- No eyebrow labels above section titles
- CTA text always fits on one line at desktop
- Single accent color (GitHub blue), used consistently across all sections
- Cards minimal — About section uses a left accent border instead
- Layout variety — each section uses a different layout family
- Mobile: explicit collapse rules per section at 768px breakpoint

## Previous Context

The site was built and iteratively refined through a design audit against the design-taste-frontend skill. Commits log the full evolution: `git log --oneline main`.
