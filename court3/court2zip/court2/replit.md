# The Time of Justice - Judicial Case Monitoring System

## Overview
A judicial case management and monitoring platform built with React, TypeScript, and Vite. The application provides a login interface for authorized judicial and administrative personnel, case monitoring dashboards, and landing pages.

## Project Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM v6
- **State Management**: TanStack React Query v5
- **Animations**: Framer Motion
- **UI Components**: Radix UI primitives + shadcn/ui

## Project Structure
```
src/
├── assets/          - Static images (hero backgrounds, logos)
├── components/      - Application components
│   └── ui/          - shadcn/ui base components
├── hooks/           - Custom React hooks
├── lib/             - Utility functions
├── pages/           - Page components (Index, NotFound)
├── App.tsx          - Root application with routing
├── main.tsx         - Entry point
└── index.css        - Global styles and Tailwind config
```

## Key Pages
- Landing page with hero section and information sections
- Login gate for judicial personnel
- Dashboard with active cases management
- Case upload functionality
- Case detail panels

## Running
- Development: `npm run dev` (runs on port 5000)
- Build: `npm run build`
- Deployment: Static site deployment from `dist/` directory

## Recent Changes
- 2026-02-06: Imported from Lovable to Replit environment
  - Updated Vite config to use port 5000 and allow all hosts
  - Removed lovable-tagger dependency from Vite config
  - Configured static deployment

## User Preferences
- (None recorded yet)
