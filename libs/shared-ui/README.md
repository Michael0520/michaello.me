# @milo-me/shared-ui

Shared UI component library for all apps using shadcn/ui.

## Purpose

Provides reusable, accessible UI components across the monorepo to ensure design consistency and reduce duplication.

## Installation

Already configured in the monorepo. Import directly:

```typescript
import { Button, Card, Dialog } from '@milo-me/shared-ui';
```

## Available Components

This library includes shadcn/ui components:

- **Button** - Customizable button with variants
- **Card** - Container component for content
- **Dialog** - Modal dialog
- **Input** - Form input field
- **Label** - Form label
- **Separator** - Visual divider
- And more...

All components are built with:

- **Radix UI primitives** - Accessible, unstyled component primitives
- **Tailwind CSS v4** - Utility-first styling
- **TypeScript** - Full type safety
- **React 19** - Latest React features

## Usage

### Basic Example

```typescript
import { Button } from '@milo-me/shared-ui';

export function MyComponent() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

### Card Example

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@milo-me/shared-ui';

export function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
    </Card>
  );
}
```

### Dialog Example

```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@milo-me/shared-ui';

export function MyDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <p>Dialog content</p>
      </DialogContent>
    </Dialog>
  );
}
```

## Adding New Components

Use shadcn CLI to add components to this library:

```bash
# Add a new component
pnpm dlx shadcn@latest add button

# Components are automatically added to:
# libs/shared-ui/src/components/ui/
```

All apps in the monorepo will have access to the new component.

## Utilities

The library also exports utility functions:

```typescript
import { cn } from '@milo-me/shared-ui';

// Merge Tailwind classes with conflict resolution
const className = cn('text-sm font-bold', 'text-lg'); // → 'font-bold text-lg'
```

## Customization

Components use CSS variables for theming. Customize in your app's global CSS:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    /* ... */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... */
  }
}
```

## File Structure

```
libs/shared-ui/
├── src/
│   ├── components/ui/         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── lib/
│   │   └── utils.ts          # Utility functions (cn)
│   └── index.ts              # Public exports
├── project.json
├── tsconfig.json
└── README.md
```

## TypeScript Support

All components are fully typed with TypeScript:

```typescript
import type { ButtonProps } from '@milo-me/shared-ui';

const customButton: ButtonProps = {
  variant: 'outline',
  size: 'sm',
  disabled: false,
};
```

## Used By

- `apps/portfolio` - Main portfolio app
- `apps/blog` - Blog app
- `apps/lab/home` - Lab home app

## References

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
