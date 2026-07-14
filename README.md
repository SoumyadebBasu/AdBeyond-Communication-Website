# 🚀 AdBeyond Communications

Architecting Impact for Non-Profits. A specialized creative partner for organizations changing the world.

This repository contains the source code for the AdBeyond Communications agency website, built as a modern, high-performance React application powered by a headless Directus CMS.

---

## ✨ Features

- 📱 **Fully Responsive Layout**: Premium look and feel across all devices (mobile, tablet, desktop) using modern CSS Grid, Flexbox, and fluid typography (`clamp` font sizing).
- 🧩 **Spotlight Design System**: Interactive components like `SpotlightCard` and `SpotlightButton` that react to cursor movement.
- 📂 **Dynamic Service Pages**: Custom pages for service areas (`/services/:slug`) loading methodologies, features, showcase galleries, and CTAs dynamically.
- 🎬 **Rich Media Portfolio**: Campaigns gallery featuring video playbacks (YouTube / direct file uploads), image galleries, and structured category filters (reels, videography, newsletters, reports).
- 💬 **Layout-Stable Testimonials**: Auto-playing testimonial slider utilizing CSS Grid overlays to eliminate height shifts during transitions, with matching partner logo highlights.
- 📬 **Interactive Consultation Form**: Connects directly to both `Web3Forms` and the Directus CMS backend.
- ⚙️ **Directus Headless Integration**: Uses `@directus/sdk` and `TanStack React Query` for seamless, cached data fetching, asset optimizations (WebP, srcset sizes), and configuration.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion (motion/react)](https://www.framer.com/motion/)
- **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **CMS Client**: [@directus/sdk v21](https://docs.directus.io/sdk/)

---

## 📁 Directory Structure

- `src/` — Main application source code
  - `components/` — Reusable UI components (`SpotlightCard`, `Navbar`, `PortfolioModal`, etc.)
  - `hooks/` — Custom hooks (`useDirectus` for TanStack Query integrations)
  - `lib/` — Directus client config and asset URL utilities
  - `pages/` — Main view templates (`Home`, `Portfolio`, `ServicePage`, etc.)
- `public/` — Static assets (place local fallbacks like `logo.png` here)
- `cms-scripts/` — Automated Node.js scripts for Directus collections schema configuration, field updates, and permission policies setup.

---

## 🚀 Local Development

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
# Required for Gemini AI API calls (optional)
GEMINI_API_KEY="your_api_key_here"

# The local development URL
APP_URL="http://localhost:3000"
```

### 3. Run the Development Server
```bash
npm run dev
```
The server will start locally at [http://localhost:3000](http://localhost:3000).

---

## 🗄️ CMS Setup & Migration
All database configuration scripts are located in the `cms-scripts/` folder. To update schema fields and configuration on your Directus instance, run:
```bash
npm run run-setup
```
