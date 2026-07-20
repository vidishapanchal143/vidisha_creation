# Vidisha | Premium AI Video Creator Portfolio

A premium, highly interactive, 3D animated personal portfolio website built for **Vidisha**, an AI Video Creator & Visual Storyteller.

Designed to make a cinematic first impression, showcase video projects, explain services, detail the creative process, and provide frictionless paths for potential clients to get in touch.

---

## 🚀 Getting Started

To launch and run the website locally:

1. Set the active workspace to this directory:
   `C:\Users\VIDISHA\.gemini\antigravity\scratch\vidisha-portfolio`
2. Open `index.html` directly in any web browser, or run a local static server.

---

## 📁 File Structure

```text
vidisha-portfolio/
│
├── index.html        # Main HTML5 structure with semantic sections and inline SVGs
├── style.css         # Custom modern CSS styling, glassmorphism, 3D tilt, parallax, and animations
├── script.js         # Interactive features (canvas particles, scroll reveal, counters, video modal)
├── README.md         # Documentation & Quick Edit Guide (this file)
│
├── images/           # Place image assets here (profile photo, project thumbnails)
│   └── (user to add)
│
└── videos/           # Place video files here (project mp4 files)
    └── (user to add)
```

---

## 🛠️ Quick Edit Guide

All key components are fully documented with HTML comments. Here are the main customizations you'll want to make:

### 1. Replace Profile Photo
Place your professional photo inside the `images/` directory and name it `vidisha-profile.jpg`. The website automatically applies a futuristic 3D parallax glass frame to it.

### 2. Add Portfolio Videos & Thumbnails
Place your project thumbnails in the `images/` folder (e.g., `project-1.jpg`, `project-featured.jpg`) and your video files in the `videos/` folder (e.g., `project-1.mp4`, `project-featured.mp4`).

Inside `index.html`, locate the comments labeled:
`<!-- PORTFOLIO SECTION — HOW TO ADD NEW PROJECTS -->`
Update the image and video sources, titles, and descriptions accordingly.

### 3. Replace Testimonials
To update client testimonials, look for `<!-- TESTIMONIALS: Replace these placeholder testimonials -->` in `index.html` and replace the placeholder text with genuine reviews.

### 4. Custom Social Links
Update the links in the footer section labeled `<!-- Replace # with your actual social media profile URLs -->` with links to your Instagram, YouTube, LinkedIn, and Twitter/X accounts.

---

## ✨ Features & Visual Interactions

* **Cinematic Loader:** A sleek, premium initial loading screen to build anticipation.
* **Floating Glass Nav:** Adaptive navbar that collapses dynamically on scroll with an elegant mobile drawer menu.
* **Background Particle Canvas:** A high-performance HTML5 Canvas interactive particle constellation system that slows down when the tab is inactive to save system resources.
* **Mouse Cursor Glow:** A smooth cursor-following soft light orb on desktop.
* **3D Tilt Cards:** Beautiful glassmorphism cards that respond to mouse movement.
* **Smooth Parallax:** Layered elements in the Hero section shift dynamically with mouse motion.
* **Seamless Scroll Reveal:** Smooth fading and sliding animations as you browse.
* **Lazy Loading & Optimized Videos:** High-performance video preloading behavior (poster images and lazy modal rendering) to keep page speed optimal.
* **Smart Contact Form:** Interactive form validation that compiles data and fallbacks directly to a formatted `mailto:` link for one-click drafts.
* **Pulse Animated WhatsApp Floating CTA:** A subtle click-to-chat button with country-prefilled standard formatting and customized initial messaging.
