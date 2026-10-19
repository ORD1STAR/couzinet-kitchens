<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:b45309,100:1f2937&height=200&section=header&text=Couzinet%20Kitchens&fontSize=48&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Animated%20showcase%20site%20for%20a%20fitted-kitchen%20workshop&descAlignY=58" alt="Couzinet Kitchens banner" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&center=true&vCenter=true&width=700&lines=Single-page+showcase+for+a+kitchen+workshop;React+18+%2B+TypeScript+%2B+Vite+%2B+Tailwind;Framer+Motion+scroll+and+letter+animations;Light+and+dark+theme%2C+French+content" alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer%20Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/status-showcase-blue?style=for-the-badge" alt="Status" />
</p>

<p align="center">
  <img src="docs/demo.gif" alt="Couzinet Kitchens demo" width="860" />
</p>

## Table of contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Tech stack](#-tech-stack)
- [Requirements](#-requirements)
- [Installation and configuration](#-installation-and-configuration)
- [Usage](#-usage)
- [Project structure](#-project-structure)
- [Testing](#-testing)
- [Troubleshooting and FAQ](#-troubleshooting-and-faq)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

## 🧭 Overview

**Problem.** A fitted-kitchen and furniture workshop needed an online presence that shows its realisations well, without a heavy CMS.

**Solution.** A lightweight, animated single-page site: a full-screen hero, a gallery of kitchen realisations, a contact section and a light/dark toggle. It is a static front end (no back end, no database, no API keys), content is in French as the site targets a French-speaking clientele.

## ✨ Features

- Full-screen hero with parallax-style scroll transform and a call-to-action button (content driven by `src/config.ts`)
- Gallery of kitchen realisations with title and description cards
- Letter-by-letter animated section titles, triggered when they scroll into view (`react-intersection-observer` + Framer Motion)
- Sticky header that changes style on scroll
- Light / dark theme toggle
- Contact section (phone, e-mail, address; currently placeholder data)
- Content in French, as the site targets a French-speaking clientele

## 📸 Screenshots

| Hero | Gallery |
|---|---|
| ![Hero](docs/hero.png) | ![Gallery](docs/gallery.png) |

| Dark mode | Contact |
|---|---|
| ![Dark mode](docs/dark-mode.png) | ![Contact](docs/contact.png) |

## 🏗 Architecture

```mermaid
flowchart LR
    CFG["src/config.ts<br/>hero content"] --> APP
    TYPES["src/types.ts"] --> APP
    PUB["public/<br/>hero + kitchen photos, logo"] --> APP
    subgraph APP["src/App.tsx (single page)"]
        HDR[Sticky header + theme toggle]
        HERO[Hero with parallax]
        GAL[Gallery cards]
        CON[Contact section]
    end
    FM[Framer Motion + intersection observer] --> APP
    TW[Tailwind CSS layers in index.css] --> APP
    APP --> VITE[Vite build to dist/ static files]
```

## 🧰 Tech stack

| Layer | Tools |
| --- | --- |
| UI | React 18, TypeScript 5 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer |
| Animation | Framer Motion 11, react-intersection-observer |
| Icons | lucide-react |
| Quality | ESLint 9 with typescript-eslint |

## 📋 Requirements

| Item | Requirement |
| --- | --- |
| OS | Windows, macOS or Linux |
| Node.js | 18 or newer (Vite 5); 20 LTS recommended. npm |
| Database / services | None |
| Hardware | No GPU or special hardware |
| Ports | `5173` (Vite dev server), `4173` (`vite preview`) |
| Accounts / API keys | None |
| Environment variables | None |

## ⚙ Installation and configuration

```bash
git clone https://github.com/ORD1STAR/couzinet-kitchens.git
cd couzinet-kitchens
npm install
npm run dev        # http://localhost:5173
```

To change the hero title, description, background image or button text, edit `src/config.ts`. Replace the photos in `public/` (`hero.jpg`, `C1.jpg` to `C4.jpg`, `Logo.png`) to use your own images. Gallery entries and contact details are defined in `src/App.tsx`.

## 🚀 Usage

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

The `dist/` folder is plain static files and can be hosted on any static host.

## 🗂 Project structure

<details>
<summary><b>Show tree</b></summary>

```
src/
  App.tsx      # page layout, sections, animations
  config.ts    # hero content (title, description, background, button text)
  types.ts     # shared TypeScript types
  index.css    # Tailwind layers and custom styles
public/        # hero image, kitchen photos, logo
docs/          # screenshots and demo GIF
```

</details>

## 🧪 Testing

There is no automated test suite. Quality checks available:

```bash
npm run lint
npm run build
```

## 🩺 Troubleshooting and FAQ

<details>
<summary><b>Port 5173 is already in use</b></summary>

Vite automatically picks the next free port and prints it in the terminal. Or stop the other process.

</details>

<details>
<summary><b>Images do not show after replacing them</b></summary>

Images are served from `public/` by absolute path (for example `/hero.jpg`). Keep the file names, or update the paths in `src/config.ts` and `src/App.tsx`.

</details>

<details>
<summary><b>Are the contact details real?</b></summary>

No. The phone, e-mail and address in the contact section are placeholders, not real business data.

</details>

## 🗺 Roadmap

- [x] Hero, gallery, contact section
- [x] Light / dark theme toggle
- [x] Scroll-triggered letter animations
- [ ] Working quote request form (the "Nous contacter" button is not wired to anything yet)
- [ ] Real contact details and gallery content from the client
- [ ] Bilingual content (the project is structured for it, only French is provided)

The project history started as a Bolt-generated scaffold and was then customised by hand with the client's photos and copy.

## 🤝 Contributing

Issues and pull requests are welcome. Please run `npm run lint` and `npm run build` before opening a PR.

## 📄 License

Released under the [MIT License](LICENSE).

## 👤 Author

<table>
  <tr>
    <td><b>Hannoun Amine Amar</b><br/>AI Engineer / Fullstack Developer, Algeria</td>
    <td>
      <a href="https://www.linkedin.com/in/hannoun-amine/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
      <a href="mailto:hannoun.amine25@gmail.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
      <a href="https://github.com/ORD1STAR"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
    </td>
  </tr>
</table>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:b45309,100:1f2937&height=120&section=footer" alt="footer" />
</p>
