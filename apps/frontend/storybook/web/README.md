# 🎨 Storybook (@frontend/storybook-web)

[![Status](https://img.shields.io/badge/Status-In%20Development-yellow.svg)](https://curator.com)
[![Storybook](https://img.shields.io/badge/Storybook-Live%20Site-gree.svg)](https://[YOUR_STORYBOOK_URL])

## 🌟 Project Overview

This application hosts the **Storybook UI Component Library** for the Curator Platform's web frontend. It is built using **Storybook 9** and **Vite**.

Its primary purpose is to visualize, test, and document the shared React components from the `@repo/ui-web` package in an isolated development environment. This ensures our UI is consistent, accessible (using `addon-a11y`), and well-documented.

## 🚀 Getting Started

To run the Storybook site locally, follow these steps.

---

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 18 or newer recommended)
- **pnpm** (as defined by the monorepo root)

### Local Setup

1.  **Navigate to the package** (from the monorepo root):

    ```bash
    cd apps/frontend/storybook-web
    ```

2.  **Install dependencies** (if not already installed from the root):

    ```bash
    pnpm i
    ```

3.  **Run the development server:**

    ```bash
    turbo run storybook:dev
    ```

4.  **Access the Storybook:**
    Open your browser and navigate to `http://localhost:6006`. The site will automatically reload when you make changes to component or story files.

---

## 📚 Component Coverage

This Storybook instance visualizes all components from the `@repo/ui-web` package. Contributors should add new stories here whenever a new component is added to the shared UI library.

**Featured Libraries:**

- **`@repo/ui-web`**: The source package containing all shared React components.
- **`tailwindcss`**: Used for all component styling.
- **`@storybook/addon-a11y`**: Used to check accessibility compliance.

---

## 📦 Source File Structure

The main files for this Storybook instance are located in the `src` directory.

| Path          | Description                                                          |
| :------------ | :------------------------------------------------------------------- |
| `.storybook/` | Contains the main Storybook configuration (addons, framework setup). |
| `public/`     | Contains static assets (if any) used within stories.                 |

---

## 🤝 Contribution

We welcome contributions to expand our component library.

1.  Create a branch for your new component/story: `git checkout -b feat/ui-new-component`
2.  Add your component to the `@repo/ui-web` package.
3.  Add a corresponding `YourComponent.stories.tsx` file inside `packages/ui-web`.
4.  Commit your changes and open a Pull Request.
