Deploy: https://guitar-shape-lib.netlify.app

# Guitar Solo Shapes Library

**Guitar Solo Shapes Library** is an advanced interactive tool designed for guitarists to bridge the gap between music theory and lead guitar improvisation. It focuses on the geometric nature of the fretboard and how harmonic functions dictate soloing patterns.

## 🚀 Key Features

- **Solo Shape Visualization**: Explore a comprehensive library of fretboard patterns (shapes) designed for fluid soloing.
- **Harmonic Function Mapping**: Understand the "why" behind the notes. The app visualizes shapes through **Tonic (Release)**, **Subdominant (Motion)**, and **Dominant (Tension)**.
- **Dual-View Integration**: A dynamic keyboard layout maps specific chord tones directly from your active fretboard shape, reinforcing ear training.
- **Smart Navigation**:
  - **Relative Key Toggle**: Switch between relative Major and Minor keys to explore "Bright" vs "Dark" soloing textures.
  - **Lock Shape**: Freeze a specific pattern to compare it with other shapes.
  - **Position Cycling**: Tap root notes to instantly see variants of the same shape across the neck.
- **Progress Tracking**:
  - Categorize shapes into **In Progress** or **Learned** to organize your practice routine.
  - Data is stored locally in your browser for instant access.
  - **Data Security**: Export/Import functionality for backing up your progress or transferring data between devices.

## 🎸 Core Methodology

The library is built on the principle that soloing is not just about scales, but about **functions**:

- **Interval Templates**: Highlighting the precise structure of Major and Minor keys.
- **Chord Tones vs. Scale Degrees**: Focused on the specific components that drive musical resolution.
- **Geometric Mastery**: Visualizing the fretboard as a connected landscape of movable shapes.

## 🛠 Technical Overview

- **Persistence**: Uses browser local memory (Local Storage).
- **Interactive UX**: Features a contextual tutorial system that provides theory insights on hover.
- **Responsive Logic**: Designed for quick switching between keys, modes, and functions without losing context.

## 💾 Data Safety Note

> **Note:** Your learning progress is stored locally in your browser. To ensure your data is safe, especially when clearing browser history, use the **Export Progress** feature to save a backup file.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
