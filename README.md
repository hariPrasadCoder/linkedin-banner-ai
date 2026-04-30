# LinkedIn Banner AI

Generate stunning, professional LinkedIn banners in seconds — powered by [Luma Uni-1](https://lumalabs.ai/uni-1).

Enter your name, role, tagline, and industry. Pick a visual style. Uni-1 generates a complete, ready-to-upload LinkedIn banner with typography, icons, and layout — no design skills needed.

---

## Features

- **5 distinct styles** — Minimal, Bold, Tech, Nature, Creative
- **Text rendered by AI** — Uni-1 accurately renders your name, role, and tagline directly in the image
- **Context-aware icons** — icons are chosen based on your industry and role
- **No photo upload needed** — purely generative, no face consistency issues
- **One-click download** — grab your banner and upload straight to LinkedIn
- **No backend** — runs entirely in the browser with a Vite dev proxy for CORS

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React + Vite |
| Image generation | [Luma Uni-1](https://lumalabs.ai/uni-1) via `agents.lumalabs.ai` |
| Styling | Inline styles + Google Fonts (DM Serif Display, DM Sans) |
| CORS proxy | Vite dev server proxy |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/hariPrasadCoder/linkedin-banner-ai.git
cd linkedin-banner-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

```bash
cp .env.example .env
```

Open `.env` and add your Luma API key:

```
VITE_LUMA_KEY=your-luma-api-key-here
```

Get your key at [platform.lumalabs.ai](https://platform.lumalabs.ai/).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## How It Works

1. **Fill in your details** — name, role, tagline, industry, and a short about-me
2. **Pick a style** — each style has a precise visual blueprint (color palette, layout zones, icon style)
3. **Generate** — the app sends a detailed layout prompt to Luma Uni-1 via the Vite proxy
4. **Download** — the result is displayed full-width; click Download to save it

### Prompt design

Each style prompt defines explicit layout zones (text zone / icon zone / negative space), font weights, colors, and icon styles. The prompts are written like design briefs — not vague descriptions. This is what gets Uni-1 to generate structured, professional output rather than abstract art.

### CORS handling

Luma's API blocks direct browser requests. The Vite dev server proxies `/luma/*` → `agents.lumalabs.ai/*` to work around this in development.

---

## Styles

| Style | Aesthetic | Background | Accent |
|---|---|---|---|
| **Minimal** | Editorial, Dieter Rams | White | Charcoal rules |
| **Bold** | Bloomberg Businessweek | Charcoal `#111` | Electric lime `#e8ff3c` |
| **Tech** | Vercel / Linear dark mode | Near-black `#060910` | Cyan `#00d4ff` |
| **Nature** | Kinfolk × Aesop | Warm cream | Sage green + terracotta |
| **Creative** | Pentagram studio poster | Electric blue `#2e3af4` | Vivid yellow `#ffd600` |

---

## Project Structure

```
src/
├── App.jsx      # UI — form, style picker, result display
├── api.js       # Luma API calls + prompt templates
└── index.css    # Base styles + fonts
vite.config.js   # Dev proxy for Luma API (CORS)
.env.example     # Required env vars
```

---

## Deployment

The Vite proxy only runs in development. For production you'll need a server-side proxy or serverless function to forward requests to `agents.lumalabs.ai` with the Authorization header — otherwise the browser will get CORS errors.

A simple Vercel Edge Function or Cloudflare Worker works well for this.

---

## Built by

[Hari Prasad](https://github.com/hariPrasadCoder) · Powered by [Luma Uni-1](https://lumalabs.ai/uni-1)
