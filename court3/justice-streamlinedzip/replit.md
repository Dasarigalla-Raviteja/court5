# The Time of Justice - Judicial Case Monitoring System

## Overview

This is a judicial case management and monitoring platform designed to track court cases, predict hearing timelines, and bring accountability to the legal system. It's themed as a Government of India Department of Justice tool. The application is a frontend-only React SPA (no backend or database yet) with mock data, built with TypeScript, Vite, and shadcn/ui components. It features a cinematic landing page with scroll-driven animations, a login gate (hardcoded credentials: admin/admin), and a dashboard with case upload, case monitoring, and home/stats views.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 with SWC for fast compilation
- **Styling**: Tailwind CSS with CSS variables for theming (government blue/gold color palette)
- **UI Components**: shadcn/ui (Radix UI primitives) — located in `src/components/ui/`
- **Routing**: React Router DOM v6 (single route `/` plus 404 catch-all)
- **State Management**: TanStack React Query v5 (initialized but not heavily used yet — no API calls)
- **Animations**: Framer Motion for scroll-driven animations and transitions
- **Forms**: React Hook Form with Zod resolvers (dependencies installed)

### Application Flow
1. **HeroLanding** → Full-screen cinematic entry page with background image, click to proceed
2. **LandingPage** → Government-styled informational page with login button
3. **LoginGate** → Simple username/password form (hardcoded: admin/admin), no real auth
4. **DashboardApp** → Tabbed dashboard with Home, Case Upload, Case Status, Reports, Users tabs

### Key Components
- `src/pages/Index.tsx` — Entry point, renders LoginGate
- `src/components/LandingPage.tsx` — Public-facing info page
- `src/components/LoginGate.tsx` — Authentication gate (frontend-only, no real auth)
- `src/components/DashboardApp.tsx` — Main dashboard shell with navigation tabs
- `src/components/HomePage.tsx` — Dashboard home with stat cards and today's hearings table
- `src/components/CaseUploadPage.tsx` — PDF upload with simulated ML timeline generation
- `src/components/ActiveCasesPage.tsx` — Case list with search/filter and detail view
- `src/components/CaseDetailPanel.tsx` — Slide-out panel showing case timeline and audit history
- Cinematic/narrative sections (HeroSection, ProblemSection, SolutionSection, etc.) — scroll-driven storytelling components with animations

### Data Layer
- **No backend or database exists.** All data is hardcoded mock data within components.
- Case lists, hearing schedules, and statistics are all static arrays in component files.
- The Case Upload feature simulates ML prediction by generating random hearing counts and dates client-side.
- TanStack React Query is set up but has no API endpoints to call.

### Project Structure
```
justice-streamlined/
├── src/
│   ├── assets/              # Static images (hero backgrounds, logos)
│   ├── components/          # Application components
│   │   └── ui/              # shadcn/ui base components (30+ components)
│   ├── hooks/               # Custom hooks (use-mobile, use-toast)
│   ├── lib/                 # Utility functions (cn helper)
│   ├── pages/               # Route pages (Index, NotFound)
│   ├── App.tsx              # Root with routing, footer, providers
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind config + CSS variables
├── attached_assets/         # Design requirement documents
├── public/                  # Static files (robots.txt)
├── vite.config.ts           # Vite config (port 5000, all hosts allowed)
├── tailwind.config.ts       # Tailwind with custom theme
├── components.json          # shadcn/ui configuration
└── package.json             # Dependencies and scripts
```

### Development Server
- Runs on port 5000 with `npm run dev`
- Host set to `0.0.0.0` with all hosts allowed for Replit compatibility
- Build output goes to `dist/` directory

### Design Decisions
- **Government portal aesthetic**: Uses a formal, institutional design language with government blue primary color, no border-radius (`--radius: 0`), system fonts (Arial/Helvetica), and structured layouts mimicking Indian government websites.
- **Frontend-only architecture**: Currently all data is mocked. This is intentional — the platform is a prototype/demo. A backend with real database, authentication, and ML prediction API would need to be added for production use.
- **shadcn/ui component library**: Provides a comprehensive set of accessible, composable UI primitives. Components are copied into the project (not imported from a package), allowing full customization.
- **Framer Motion animations**: Used extensively in the cinematic landing sections for scroll-driven storytelling. The dashboard sections use simpler transitions.

## External Dependencies

### NPM Packages (Key)
- `react` / `react-dom` 18.x — Core UI framework
- `vite` 5.x with `@vitejs/plugin-react-swc` — Build tooling
- `react-router-dom` 6.x — Client-side routing
- `@tanstack/react-query` 5.x — Async state management (ready for future API integration)
- `framer-motion` 12.x — Animation library
- `tailwindcss` — Utility-first CSS
- Radix UI primitives (accordion, dialog, dropdown, tabs, toast, tooltip, etc.) — Accessible component primitives
- `class-variance-authority` + `clsx` + `tailwind-merge` — Style composition utilities
- `recharts` — Charting library (via shadcn chart component)
- `react-hook-form` + `@hookform/resolvers` + `zod` — Form handling and validation
- `date-fns` — Date utilities
- `lucide-react` — Icon library
- `sonner` — Toast notifications
- `vaul` — Drawer component
- `embla-carousel-react` — Carousel component
- `cmdk` — Command palette component
- `next-themes` — Theme management
- `react-day-picker` — Date picker component

### External Services
- **Google Fonts**: Playfair Display and Inter fonts loaded via CDN in `index.html`
- **No backend API, database, or third-party services** are currently integrated

### Assets
- Hero background images stored in `src/assets/`
- Design specification documents in `attached_assets/` describing the case upload and monitoring UI requirements