# Coding Style Guide

This guide establishes the syntax layout conventions, component designs, and best practices for the codebase.

---

## 🚀 TypeScript Standards

- Use `type` for simple data payloads/structures, and `interface` for classes or react component props.
- Avoid using `any`. If a value is unknown, use `unknown` or specify partial models:

  ```typescript
  // Incorrect:
  const data: any = dbSnap.data();

  // Correct:
  const data = dbSnap.data() as ProfileData;
  ```

- Enable TS strictly: no unused vars (`noUnusedLocals: true`) and checked implicit returns.

---

## 💅 CSS & Design Tokens

We use Vanilla CSS paired with Tailwind CSS utilities.

### Theme & Colors

Our color values use modern slate/slate palettes and custom primary markers:

```css
/* src/app/globals.css */
--primary: hsl(221.2 83.2% 53.3%); /* Deep Blue */
--accent: hsl(262.1 83.3% 57.8%); /* Vibrant Purple/Indigo */
--background: hsl(222.2 84% 4.9%); /* Slate Dark */
```

### Layout Conventions

- **Containers**: Always wrap views in modern grids or flex containers. Specify padded offsets (`p-4 md:p-6 lg:p-8`).
- **Buttons**: Leverage Shadcn core design structures. Use Lucide icons on buttons (`gap-2` spacing).

---

## 🧱 Component Design Guidelines

- **Logic Isolation**: Keep fetch endpoints in `src/services/` rather than embedded inside client page hooks.
- **Responsiveness**: Mobile-first grid states:
  ```tsx
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Cards Go Here */}
  </div>
  ```
