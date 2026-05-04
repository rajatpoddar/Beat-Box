# Gemini / AI Context File

This file provides system context, known caveats, and architectural details to help AI agents (like Gemini) understand and assist with the "Beat-Box" application project efficiently.

## Core Architecture

**1. Frontend (`/frontend`)**
*   **Tech**: React, Vite, TypeScript, Tailwind CSS (v4), Framer Motion.
*   **Structure**:
    *   `src/components/`: Reusable UI components (HeroSection, ServicesSection, etc.).
    *   `src/layouts/`: Layout wrappers (AdminLayout).
    *   `src/pages/`: Full page views (AdminBookings, AdminInventory, AdminStaff).
*   **Styling**: Relies heavily on Tailwind CSS with a dark theme (bg-[#0a0a0a] or bg-[#111111]). Highlight colors are predominantly Beat-Box Red (`#e50914`) and Yellow (`#f5c518`).
*   **State/Data**: Uses standard React hooks (`useState`, `useEffect`). API calls are made directly via `axios`.

**2. Backend (`/backend`)**
*   **Tech**: FastAPI, SQLite, SQLAlchemy.
*   **Structure**:
    *   `main.py`: Application entry point.
    *   `app/models.py`: SQLAlchemy database models.
    *   `app/schemas.py`: Pydantic validation schemas.
    *   `app/auth.py`: JWT-based authentication logic.
    *   `app/routers/`: API route definitions.
*   **Database**: A single local SQLite database (`beatbox.db`) mapped as a Docker volume in production.

## Known Caveats & Linting Workarounds

If you are modifying code in this codebase, please keep these specific workarounds in mind:

1.  **Framer Motion `Variants` Type Issue:**
    *   *Issue:* Vite (specifically Rolldown/ESBuild) in production build throws a `[MISSING_EXPORT]` error when trying to import `Variants` from `framer-motion` as a normal module.
    *   *Solution:* Always use explicit type imports for Framer Motion types.
        *   **DO:** `import type { Variants } from 'framer-motion'`
        *   **DON'T:** `import { motion, Variants } from 'framer-motion'`

2.  **React Hooks Linting (`react-hooks/set-state-in-effect`):**
    *   *Issue:* The current ESLint flat config setup strictly blocks calling async data-fetching functions inside `useEffect` if they directly trigger synchronous `setState` updates (like `setLoading(true)`).
    *   *Solution:* In files like `AdminBookings.tsx`, `AdminInventory.tsx`, and `AdminStaff.tsx`, we have deliberately bypassed this with `// eslint-disable-next-line react-hooks/set-state-in-effect` above the fetch call. Preserve this override unless you intend to completely rewrite the data-fetching layer to use a tool like React Query.

3.  **Static Components inside Render:**
    *   *Issue:* Declaring nested functional components inside a parent component's render function (e.g., `const SidebarContent = () => <div/>` inside `AdminLayout()`) violates `react-hooks/static-components` and hurts performance.
    *   *Solution:* Always extract helper components outside of the main component scope and pass required state via props.

## Script Map

*   `./start.sh`: Convenience script to boot up the python backend `uvicorn` server and the frontend `vite` server simultaneously in the host machine for local development.
*   `./run-docker.sh`: Tears down existing Docker containers and orchestrates a fresh `docker-compose up --build -d`.
*   `docker-compose.yml`: Maps `9080:80` for the frontend web server (Nginx) and `9081:8000` for the FastAPI backend. Connects the local `beatbox.db` via a volume mount to ensure persistence.
