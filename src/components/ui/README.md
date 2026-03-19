## UI Layer Overview

This folder is the root of the UI design system. It defines the **public UI surface** that the rest of the app should consume.

### Folder structure

- **`shadcn/`**  
  Vendor folder containing third‑party components copied from shadcn.
  - Treat this as **implementation detail**.
  - **Do not** import from `@/components/ui/shadcn/...` in feature code; go through `primitives` instead.

- **`primitives/`**  
  Thin, design‑system controlled primitives that wrap or re‑export shadcn components.
  - Source of truth for low‑level building blocks (buttons, inputs, dialogs, etc.).
  - No business logic, only styling and light ergonomics.
  - Example:

```ts
import { Button, Input, Dialog } from "@/components/ui/primitives";
```

- **`components/`**  
  Product‑level / design‑system components that compose primitives and add behavior.
  - Examples: `Button`, field components under `inputs/*`, feedback components, `ThemeSwitcher`.
  - These are the **default layer** most consumers should import from:

```ts
import { Button, TextField, DialogModal } from "@/ui";
```

- **`patterns/`**  
  Higher‑level compositions and flows built from multiple components and primitives.
  - Examples (future): multi‑step wizards, complete forms, page‑level layout patterns.
  - Not currently exported from the root UI index until patterns stabilize.

- **`hooks/`**  
  UI‑specific React hooks such as `useIsMobile`.
  - Hooks can depend on primitives, but not on feature code.

### Import guidelines

- Prefer **`@/ui`** for stable, design‑system level components and hooks.
- Use **`@/ui/primitives`** when you need fine‑grained control over layout/behavior or when building new components/patterns.
- Avoid importing from **`@/components/ui/shadcn`** directly; this keeps the vendor boundary clear and makes shadcn upserts safer.

### Component categories (current and future)

Under `components/`, we group components by role rather than by page:

- **Inputs** – form fields (`text-field`, `select-field`, `date-picker-field`, etc.).
- **Feedback** – alerts, dialogs, toasts, loading states.
- **Theming** – components like `theme-switcher`.
- **Future categories (guidance)**:
  - **Navigation** – menus, breadcrumbs, tabs, pagination, sidebars.
  - **Layout** – containers, cards, sections, responsive layout helpers.
  - **Data display** – tables, lists, chips/badges, summary blocks.
  - **Overlay** – modals, drawers, popovers, tooltips.

When adding new components, try to fit them into one of these categories or introduce a new category only when it represents a reusable UI concern (not a single feature or page).
