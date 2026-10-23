# Manual and shadcn/ui component comparison

This playground compares the keyboard-accessible manual components in
`src/components/manual` with the shadcn/ui primitives in `src/components/ui`.
The shadcn Dialog is the modal equivalent; Collapsible is used for the
disclosure.

## Keyboard behavior

- **Modal:** Tab and Shift+Tab cycle through available controls without leaving
  the open dialog. Escape closes it, and focus returns to the element that had
  focus before it opened. If the dialog has no controls, focus stays on the
  dialog.
- **Tabs:** Tab enters the selected tab; Left/Right Arrow move between tabs,
  wrapping at either end. Home and End move to the first and last tabs.
- **Disclosure:** Its native button supports Enter and Space to toggle content.
  The expanded state and controlled panel are exposed to assistive technology.

## Concrete implementation gaps

1. **Composition and customization:** The manual Modal and Tabs are fixed
   examples with hard-coded titles, labels, and content. shadcn's Dialog and
   Tabs are composable primitives (for example, `DialogTrigger` /
   `DialogContent` and `TabsList` / `TabsTrigger` / `TabsContent`) that callers
   assemble and customize.
2. **Modal lifecycle and focus management:** The manual Modal implements its
   own focus trap, initial focus, Escape handling, and focus restoration in
   application code. shadcn's Dialog delegates modal behavior and focus
   management to Radix Dialog, reducing the amount of behavior the component
   consumer must maintain.
3. **Tabs options:** The manual Tabs example only supports three horizontal
   tabs with automatic activation. shadcn's Tabs exposes options such as
   orientation and activation mode, and supports controlled or uncontrolled
   values.
4. **Disclosure API:** The manual Disclosure is a single fixed example.
   shadcn's Collapsible separates the root, trigger, and content, and exposes
   controlled/uncontrolled state through the underlying primitive.

## TypeScript

Component props are explicitly typed without `any` escapes. Validate the
playground with `npm run build` from the `playground` directory.
