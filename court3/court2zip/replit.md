# The Time of Justice - Judicial Case Monitoring System

## Overview

This is a judicial case management and monitoring platform themed as a Government of India initiative under the Department of Justice. The application allows authorized judicial and administrative personnel to upload court cases, generate predicted hearing timelines (simulating ML predictions), monitor case progress through a dashboard, and track hearing statuses. The core workflow is: cinematic landing page → government-styled info page → login gate → tabbed dashboard with case upload, case monitoring, and reporting capabilities. All data is currently frontend-only with mock/hardcoded data stored in localStorage — there is no backend or database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 with SWC plugin for fast compilation
- **Styling**: Tailwind CSS with CSS custom properties for theming (government blue/gold color palette, zero border-radius for official look)
- **UI Components**: shadcn/ui built on Radix UI primitives — all base components live in `src/components/ui/`
- **Routing**: React Router DOM v6 with a single route (`/`) plus a 404 catch-all
- **State Management**: TanStack React Query v5 is initialized but not actively used (no API calls exist yet)
- **Animations**: Framer Motion for scroll-driven animations, transitions, and cinematic narrative sections
- **Forms**: React Hook Form with Zod resolvers (dependencies installed, used in login)
- **Date Utilities**: date-fns v3

### Application Flow
1. **HeroLanding** → Full-screen cinematic entry with background image, click to proceed
2. **LandingPage** → Government-styled informational page with login button and narrative scroll sections (ProblemSection, SolutionSection, ImpactSection, etc.)
3. **LoginGate** → Simple username/password authentication (hardcoded: `admin`/`admin`), no real backend auth
4. **DashboardApp** → Tabbed dashboard shell with five tabs: Home, Case Upload, Case Status, Reports, Users
5. **HomePage** → Dashboard home showing stat cards and today's hearings, dynamically calculated from localStorage
6. **CaseUploadPage** → PDF upload (drag & drop) with case category selection, simulated ML timeline generation producing 14 hearings
7. **ActiveCasesPage** → Case list with search/filter, case detail slide-out panel, and Update Progress functionality
8. **CaseDetailPanel** → Slide-out panel showing full case metadata and hearing timeline

### Data Layer
- **No backend or database.** All data lives in component state and `localStorage` under the key `monitoring_cases`.
- Case lists, hearing schedules, and statistics are generated client-side with mock data.
- The Case Upload feature simulates ML prediction by generating a fixed number of hearings (14) with dates spaced 14 days apart.
- Hearing statuses can be updated to "Completed" or "Adjourned" with password authentication (using the same hardcoded `admin` password).
- TanStack React Query is set up but currently has no API endpoints to call.

### Key Domain Concepts
- **Predicted Hearings**: When a case is uploaded, the system generates a predicted number of hearings (currently fixed at 14). This count must remain consistent across all views (timeline, case detail, update progress).
- **Hearing Status Updates**: On the scheduled hearing date, users can mark hearings as "Completed" or "Adjourned" via the Update Progress interface. Password authentication is required for each update.
- **Timeline History**: Every case displays a full vertical timeline showing all predicted hearings with their numbers, dates, times, and statuses.
- **Progress Synchronization**: When hearing statuses are updated, the changes must reflect across all modules — dashboard stats, case monitoring, and the timeline view.

### Project Structure
```
court2/
├── src/
│   ├── assets/              # Static images (hero backgrounds, logos)
│   ├── components/          # Application components
│   │   ├── ui/              # shadcn/ui base components (40+ components)
│   │   ├── ActiveCasesPage.tsx    # Case monitoring with search/filter
│   │   ├── CaseDetailPanel.tsx    # Slide-out case detail view
│   │   ├── CaseUploadPage.tsx     # PDF upload + timeline generation
│   │   ├── DashboardApp.tsx       # Main dashboard shell with tabs
│   │   ├── HomePage.tsx           # Dashboard home with stats
│   │   ├── HeroLanding.tsx        # Cinematic entry page
│   │   ├── LandingPage.tsx        # Government info page
│   │   ├── LoginGate.tsx          # Authentication gate
│   │   └── [narrative sections]   # Scroll-driven storytelling components
│   ├── hooks/               # Custom hooks (use-mobile, use-toast)
│   ├── lib/                 # Utilities (cn function)
│   ├── pages/               # Route pages (Index, NotFound)
│   ├── App.tsx              # Root app with routing and footer
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles, Tailwind config, CSS variables
├── vite.config.ts           # Vite config (port 5000, all hosts allowed)
├── tailwind.config.ts       # Tailwind with custom theme
├── components.json          # shadcn/ui configuration
└── package.json             # Dependencies and scripts
```

### Development
- **Dev server**: `npm run dev` — runs on port 5000 with host `0.0.0.0`
- **Build**: `npm run build` — produces static output in `dist/`
- **TypeScript**: Relaxed strictness (no strict mode, no unused variable checks)
- The project root for the application is the `court2/` directory

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Full suite of accessible primitives (dialog, dropdown, tabs, tooltip, etc.)
- **shadcn/ui**: Pre-built component layer over Radix (configured via `components.json`)
- **Framer Motion**: Animation library for scroll-driven effects and transitions
- **Lucide React**: Icon library used throughout the application
- **Embla Carousel**: Carousel functionality
- **cmdk**: Command palette component
- **Vaul**: Drawer component
- **Recharts**: Charting library (configured but not heavily used yet)

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation (via `@hookform/resolvers`)

### Utilities
- **date-fns**: Date formatting and manipulation
- **class-variance-authority (CVA)**: Component variant management
- **clsx / tailwind-merge**: Conditional class name utilities
- **next-themes**: Theme switching support (installed but dark mode not prominently used)
- **Sonner**: Toast notifications (secondary toast system alongside Radix toast)

### Fonts
- **Google Fonts**: Playfair Display (serif headings) and Inter (body text) loaded via CDN in `index.html`
- **System fallback**: Arial, Helvetica, sans-serif configured in Tailwind

### No Backend Services
- No database, no API server, no authentication service
- No third-party API integrations
- All data is mock/hardcoded and persisted only in browser localStorage