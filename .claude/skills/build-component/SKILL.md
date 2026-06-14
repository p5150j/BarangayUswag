---
name: build-component
description: Scaffold a new Next.js/TypeScript React component for Barangay Uswag following the project's Tailwind conventions, color palette, and mobile-first design requirements. Use when adding a new page section or reusable UI element.
---

When the user runs `/build-component <ComponentName>` (or asks you to build a component), do the following:

1. **Confirm the component's purpose** — if not clear from context, ask: what section or UI element is this for?

2. **Create the file** at `src/components/<ComponentName>.tsx` with:
   - A typed `Props` interface
   - `export default function <ComponentName>({ ... }: Props)`
   - Mobile-first Tailwind classes (start with base/mobile styles, add `md:` and `lg:` breakpoints)
   - Use `brand-blue` (`#1E3A8A`) and `brand-green` (`#059669`) color values (or their Tailwind equivalents until tokens are configured)
   - Import Lucide React icons where icons are needed (`import { IconName } from 'lucide-react'`)
   - No hardcoded pixel values — use Tailwind spacing/typography scale

3. **Import and render it** in the appropriate parent file (usually `src/app/page.tsx`) if the user asks, or note where to add it.

4. **Run Prettier** on the new file: `npx prettier --write src/components/<ComponentName>.tsx`

Always keep components focused on a single responsibility. Do not add state management or data fetching unless explicitly requested — this is a static site.
