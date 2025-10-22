# User Management System

[English](#english) | [Türkçe](#turkish)

---

<a name="english"></a>
## 🇬🇧 English

### Installation & Running

```bash
npm install
npm run dev          # Development server (localhost:5173)
npm run build        # Production build
npm run test         # Run tests
```

### Tech Stack

- **React 19** + **TypeScript** - Type-safe UI development
- **Redux Toolkit** - Global state management
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Headless UI** - Styling
- **Radix UI** - Accessible components
- **TanStack Table** - Data tables
- **Formik + Zod** - Form handling & validation

### Folder Structure

```
src/
├── app/              # Redux store config
├── features/         # Redux slices (users)
├── pages/            # Page components
├── components/       # Reusable components
│   ├── common/       # Shared components
│   └── ui/           # Base UI components
├── hooks/            # Custom hooks
├── lib/              # Utils & API layer
└── context/          # React contexts
```

### Development Standards

#### Naming Conventions
- **Components/Hooks:** `kebab-case` (e.g., `add-user.tsx`, `use-mobile.ts`)
  - Reason: Filesystem-friendly, URL-friendly, consistent with modern frameworks
- **Utils/Libs:** `camelCase` (e.g., `fakeApi.ts`, `utils.ts`)
  - Reason: Follows JavaScript naming conventions

#### State Management - Redux Toolkit
- **Why Redux?** Predictable state flow, excellent DevTools, scalability, better for team collaboration
- **Organization:** Feature-based slices in `/features` directory
- **Structure:** Each slice contains state, actions, thunks, and selectors
- **Alternative:** Context API was considered but Redux offers better debugging and middleware support

#### Styling - Tailwind CSS
- **Why Tailwind?** Rapid development, consistent design system, excellent performance
- **Approach:** Utility classes in JSX, use `cn()` utility for complex combinations
- **No custom CSS classes** - composition of utilities

#### Import Strategy
- **Path alias:** `@/` → `./src/` for cleaner imports
- **No barrel exports** - individual imports for better tree-shaking
```tsx
// ✅ Preferred
import { Button } from "@/components/ui/button"

// ❌ Avoided
import { Button } from "@/components/ui"
```

#### Architecture
**Three-Layer Approach:**
1. **Presentation** (`/pages`, `/components`) - UI components
2. **Business Logic** (`/features`) - Redux slices & thunks
3. **Data** (`/lib/api`) - API abstraction
