# FlyRank Internship - Assignment 2: Accessible Component Fundamentals

This branch contains the submission for **Assignment 2: Accessible Component Fundamentals**. 

The goal of this assignment was to build three interactive components from scratch (Modal, Tabs, and Disclosure) strictly following the W3C ARIA Authoring Practices, and then compare them against the generated code of `shadcn/ui` to identify accessibility gaps.

## 📁 Repository Structure

*   **`/playground`** - The standalone React + TypeScript + Vite application containing the assignment deliverables.
    *   `/playground/src/components/manual` - The three hand-built components (Modal, Tabs, Disclosure).
    *   `/playground/src/components/ui` - The shadcn/ui generated components (Dialog, Tabs).
    *   **`/playground/NOTES.md`** - **[⚠️ Click here for the required assignment notes]** The detailed comparison between my manual implementation and shadcn/ui.
    *   `/playground/README.md` - Specific instructions on how to run the playground locally.

## 🛠️ How to Run the Playground

1. Navigate to the playground folder:
   ```bash
   cd playground
   ```
   Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Open the local URL (usually http://localhost:5173) in your browser.

⌨️ How to Test Accessibility (Keyboard Only)
Once the app is running, please test the components using only your keyboard:

Disclosure: Tab to focus the button, press Enter or Space to expand/collapse.

Tabs: Tab into the tab list, then use the Left and Right arrow keys to switch between tabs.

Modal: Tab to the "Open Modal" button and press Enter.

Press Tab continuously to ensure focus is trapped inside the modal.

Press Shift + Tab to ensure it cycles backwards.

Press Escape to close the modal. Ensure focus returns to the "Open Modal" button.

📝 Evaluation Criteria Checklist
☑ All three components operate fully by keyboard.
☑ Modal traps focus and returns it on close.
☑ Notes name at least two concrete gaps between the manual version and shadcn's.
☑ TypeScript compiles with no any escapes in component props (run npx tsc --noEmit inside playground to verify).
