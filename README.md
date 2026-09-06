# @gorth/primitive

Shared React UI library.

## Install from GitHub

```bash
pnpm add @gorth/primitive@github:goraria/base-primitive
```

Or via dependency alias in another project:

```json
{
  "dependencies": {
    "@gorth/primitive": "github:goraria/base-primitive"
  }
}
```

## Usage

Import Tailwind once, then import the Primitive source stylesheet. Primitive
registers its own component source, so consumers do not need a `node_modules`
`@source` path:

```css
@import "tailwindcss";
@import "@gorth/primitive/globals.css";

@source "../**/*.{ts,tsx}";
```

```tsx
import { Button } from "@gorth/primitive/custom/button"

export function Demo() {
  return <Button>Click me</Button>
}
```

## Development

```bash
pnpm install
pnpm build
```
