---
to: apps/frontend/<%=name%>/README.md
---
# <%=formalName%> | Web Platform

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8) ![Status](https://img.shields.io/badge/Status-MVP-orange)

> <%=description%>

---

## 📚 Table of Contents

*   [🏗 Architecture Overview](#-architecture-overview)
    *   [Core Architectural Pillars](#core-architectural-pillars)
*   [🛠 Tech Stack](#-tech-stack)
*   [📂 Project Structure](#-project-structure)
*   [📐 Key Patterns & Guidelines](#-key-patterns--guidelines)
*   [🚀 Getting Started](#-getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Development Scripts](#development-scripts)
*   [🧪 Quality Assurance](#-quality-assurance)
*   [🤝 Contributing](#-contributing)

---

## 🏗 Architecture Overview

This project implements a **Vertical Slice / Feature-Based Architecture** using the **Next.js App Router**. It acts not just as a UI layer, but as a **BFF (Backend For Frontend)**, aggregating data from our underlying microservices (Identity, Roadmap, Interaction) and serving optimized content to the user.

### Core Architectural Pillars

1.  **Screaming Architecture:** The folder structure reflects the Business Domain (DDD), not framework technicalities. You will find `roadmap` and `identity` folders, not just `components` and `hooks`.
2.  **Hybrid Rendering Strategy:**
    *   **React Server Components (RSC):** Default for data fetching, layout, and heavy content rendering (SEO optimized).
    *   **Client Components:** "Islands of interactivity" (Forms, Players, Like buttons) managed via standard React hooks.
3.  **Type Safety:** End-to-end type safety using TypeScript, sharing DTO types with backend services where possible.
4.  **Performance First:** Server-side heavy lifting to minimize client-side JavaScript bundles.

---

## 🛠 Tech Stack

| Category        | Technology                                | Purpose                                          |
| :-------------- | :---------------------------------------- | :----------------------------------------------- |
| **Framework**   | [Next.js 16+](https://nextjs.org/)        | App Router, Server Actions, SSR/SSG.             |
| **Language**    | [TypeScript](https://www.typescriptlang.org/) | Static typing and domain modeling.               |
| **Styling**     | [Tailwind CSS](https://tailwindcss.com/)  | Utility-first CSS.                               |
| **UI Library**  | [shadcn/ui](https://ui.shadcn.com/)       | Accessible, copy-paste component primitives.     |
| **Server State**| [TanStack Query](https://tanstack.com/query)| Async state management, caching, and revalidation.|
| **Client State**| [Zustand](https://github.com/pmndrs/zustand)| Global client state (e.g., Media Player status). |
| **Forms**       | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form handling and schema validation.             |
| **Testing**     | [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/) | Unit and E2E testing strategies.                 |
| **Observability**| [OpenTelemetry](https://opentelemetry.io/) | Tracing and metrics instrumentation.             |

---

## 📂 Project Structure

We follow a strict **Domain-Driven** directory structure. Code that belongs together, stays together.

```text
src/
├── app/                        # Next.js App Router (Routes & Layouts only)
│   ├── (auth)/                 # Route Group: Login, Register
│   ├── (dashboard)/            # Route Group: Protected User Area
│   │   ├── layout.tsx          # Persistent Dashboard Shell
│   │   └── roadmap/[slug]/     # Roadmap Detail Page
│   └── layout.tsx              # Root Layout
│
├── features/                   # 🧠 THE CORE: DDD Bounded Contexts
│   ├── auth/                   # Identity Context
│   │   ├── components/         # e.g., LoginForm, UserMenu
│   │   ├── services/           # Server Actions & API calls
│   │   └── types/              # Domain interfaces
│   ├── roadmap/                # Roadmap Context
│   │   ├── components/         # e.g., StepList, RoadmapCard
│   │   └── hooks/              # e.g., useRoadmapProgress
│   └── interaction/            # Interaction Context (Comments, Likes)
│
├── shared/                     # Shared kernel & Utilities
│   ├── components/ui/          # Shadcn primitives (Button, Card, Input)
│   ├── lib/                    # Utils (cn, fetch wrappers)
│   └── hooks/                  # Generic hooks (useDebounce, etc.)
│
├── styles/                     # Global styles
└── test/                       # Test setup and mocks
```

---

## 📐 Key Patterns & Guidelines

1.  **Data Fetching (BFF Pattern)**
    *   We prioritize fetching data on the Server (RSC).
    *   **Reads:** Use `async` Server Components to call internal Microservices (via API-Gateway).
    *   **Writes:** Use Server Actions.
    *   **Client-Side Fetching:** Only use TanStack Query when real-time updates or user-triggered refetches are strictly necessary without page reloads.

2.  **Component Hierarchy**
    *   **Page (`page.tsx`):** Must remain lightweight. It fetches data and passes it to Feature Components.
    *   **Feature Components:** Logic-heavy components specific to a domain (e.g., `RoadmapViewer`).
    *   **UI Components:** Dumb, reusable components located in `shared/components/ui`.

3.  **State Management**
    *   **URL as State:** Store filter/sort parameters in the URL (`searchParams`) whenever possible.
    *   **Server State:** TanStack Query.
    *   **Global Client State:** Zustand (Use sparingly).
    *   **Local State:** `useState` / `useReducer`.

---

## 🚀 Getting Started

### Prerequisites

*   Node.js 20+
*   `pnpm` (recommended) or `npm`/`yarn`
*   Docker (optional, for running local backend mocks)

### Installation

```bash
# 1. Clone the repository
git clone <project-url>

# 2. Install dependencies
pnpm install

# 3. Setup Environment Variables
cp .env.example .env.local
# Update .env.local with your local API endpoints
```

### Development Scripts

```bash
# Run development server
pnpm dev

# Run linter
pnpm lint

# Run Unit Tests
pnpm test:unit

# Run E2E Tests (Headless)
pnpm test:e2e
```

---

## 🧪 Quality Assurance

We strictly adhere to the **Testing Trophy** philosophy:

*   **Static Analysis:** TypeScript + ESLint (Prettier).
*   **Unit Tests (Vitest):** For utility functions, hooks, and complex logic.
*   **Integration Tests:** Testing feature components in isolation.
*   **E2E Tests (Playwright):** Critical user journeys (Login -> View Roadmap -> Complete Step).

---

## 🤝 Contributing

Please read `CONTRIBUTING.md` before submitting a Pull Request. We follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (e.g., `feat(roadmap): add progress tracking`).

Built with ❤️ by the Curator Engineering Team.