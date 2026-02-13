# Judicial Case Monitoring System

## Overview
A React + Vite + TypeScript web application for judicial case management. Built with shadcn/ui components, Tailwind CSS, and React Router. This is a frontend-only application with no backend.

## Project Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: TanStack React Query
- **Charts**: Recharts

## Project Structure
- `src/` - Application source code
  - `components/` - React components (pages + UI primitives)
  - `components/ui/` - shadcn/ui component library
  - `assets/` - Static images
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
- `public/` - Static assets served directly
- `index.html` - Entry HTML file

## Development
- Dev server: `npm run dev` (port 5000, host 0.0.0.0)
- Build: `npm run build` (outputs to `dist/`)
- Vite config allows all hosts for Replit proxy compatibility

## Deployment
- Static deployment using built `dist/` directory
