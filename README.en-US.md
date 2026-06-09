# HS Admin Future

> A modern admin dashboard frontend by Hypersense Open Source Organization, built with Vue 3 + TypeScript + shadcn-vue + Tailwind CSS v4, featuring a liquid glass design language.

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Vue | 3.5 | Progressive JavaScript framework |
| TypeScript | 6.x | Type safety |
| Vite | 8.x | Next-generation build tool |
| Pinia | 3.x | Vue state management |
| Vue Router | 5.x | Routing |
| Tailwind CSS | 4.x | Utility-first CSS framework |
| shadcn-vue | 2.x | Customizable UI components |
| reka-ui | 2.x | Unstyled headless components |
| vue-i18n | 11.x | Internationalization (zh/en) |
| Axios | 1.x | HTTP client |
| ECharts | 6.x | Data visualization |

## Features

- **Liquid Glass Design System** — Custom Glass component library (30+ components) with glass effect toggle and light/dark theme switching
- **Multiple Layout Modes** — Sidebar, top navigation, and hybrid layouts with free switching
- **Dynamic Routing & Permissions** — Routes registered dynamically from backend menu API, button-level permission control
- **Multi-tenant Architecture** — Row-level data isolation, tenant plan management
- **Internationalization** — vue-i18n with Chinese/English, hot-switchable
- **System Management** — Full CRUD for users, roles, menus, departments, dictionaries, logs, notices, and configs
- **Platform Documentation** — Frontend/backend/mobile doc pages with liquid glass style and video background
- **Code Generator** — Integrated with backend code generation API for rapid CRUD scaffolding
- **User Profile** — Avatar upload, profile editing, security settings, operation logs

## Project Structure

```
src/
├── api/                  # API definitions (split by business module)
├── assets/               # Static resources (images, styles, videos)
├── components/
│   ├── glass/            # Liquid glass component library (30+ components)
│   │   └── core/         # Core composables (useGlassFilter, useGlassTheme)
│   └── ui/               # shadcn-vue base components (28 categories)
├── composables/          # Composable functions
├── constants/            # Constants
├── enums/                # Enum types
├── lang/package/         # i18n language packs (zh-cn.json, en.json)
├── layouts/              # Layout components (sidebar/top/hybrid)
│   └── components/       # Layout sub-components (Sidebar, Navbar, Toolbar, TagsView)
├── lib/                  # Utilities (cn, request)
├── router/               # Route configuration (static + dynamic routes)
├── settings/             # Global settings
├── stores/               # Pinia stores (user, app, settings, permission, tagsView)
├── styles/               # Global styles
├── types/                # TypeScript type declarations
├── utils/                # Utility functions
└── views/                # Page views
    ├── dashboard/        # Dashboard (stats, trends, todos, activity)
    ├── login/            # Login page
    ├── profile/          # User profile
    ├── system/           # System management (user/role/menu/dept/dict/log/notice/tenant)
    ├── doc/              # Platform docs (frontend/backend/mobile)
    │   └── components/   # Shared doc components (Hero, Architecture, TechStack, etc.)
    ├── codegen/          # Code generator
    ├── demo/             # Feature demo pages
    └── error/            # Error pages (401/404)
```

## Getting Started

### Prerequisites

- Node.js >= 18.x (20.x LTS recommended)
- pnpm >= 8.x
- Git >= 2.30

### Installation

```bash
# Clone the repository
git clone https://github.com/ac4nd/hs-admin-future.git
cd hs-admin-future

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build & Deploy

```bash
# Production build
pnpm build

# Preview build output
pnpm preview
```

### Environment Configuration

Environment variables are managed via `.env.development` and `.env.production`:

```bash
# .env.development
VITE_API_URL=/dev-api
```

In development, API requests are proxied through Vite to the backend (default `http://localhost:8000`) to avoid CORS issues.

## Backend

The backend is built with Java 17 + Spring Boot 4.0.5 + PostgreSQL 16.4, providing a complete multi-tenant permission management API:

- Repository: [GodlikeAgents](https://github.com/ac4nd/GodlikeAgents)
- API Docs: Access `/doc.html` after startup (Knife4j)

## Development Conventions

- **Components**: `<script setup lang="ts">` + Composition API
- **Styling**: Tailwind CSS 4 + CSS Variables for theming
- **State Management**: Pinia Setup Store pattern (`defineStore('name', () => {})`)
- **API Layer**: `src/api/` split by module, unified axios instance from `request.ts`
- **Routing**: Static routes in `router/`, dynamic routes registered via `router.addRoute()` from backend API
- **Internationalization**: All user-facing text uses `t()` function, language packs in `src/lang/package/`
- **Code Quality**: ESLint + Prettier + Stylelint + Husky + Commitlint + lint-staged

## License

[MIT License](LICENSE)

---

**Hypersense Open Source Organization**

Explore Frontier · Perceive Future · Geek Spirit
