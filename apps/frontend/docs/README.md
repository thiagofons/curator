# 📚 Curator Platform Documentation (Docs App)

## 🌟 Project Overview

This repository hosts the documentation source code for the **Curator Platform**, built using **Nextra**. The goal is to provide a single, organized source of truth for all architectural decisions, domain models, setup guides, and operational procedures for our engineering team.

## 🚀 Getting Started

To run the documentation site locally, follow these steps.

---

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 18 or newer recommended)
- **pnpm** (version 9.5.0)

### Local Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/thiagofons/curator.git
    cd apps/frontend/docs
    ```

2.  **Install dependencies:**

    ```bash
    pnpm i
    ```

3.  **Run the development server:**

    ```bash
    pnpm dev
    ```

4.  **Access the Docs:**
    Open your browser and navigate to `http://localhost:4001`. The site will automatically reload when you make changes to the source files (`content` directory).

---

## 📝 Documentation Progress Tracker

This table tracks the completion status of the core documentation pages. Contributors should use this as a reference when prioritizing documentation work.

| Area                     | Page                    | Status (Written) | Status (Reviewed) |
| :----------------------- | :---------------------- | :--------------- | :---------------- |
| **Architecture**         | `/architecture`         | ✏️               | ⬜                |
| **Developer Experience** | `/developer-experience` | ⬜               | ⬜                |
| **Getting Started**      | `/getting-started`      | ⬜               | ⬜                |
| **Platform and SRE**     | `/platform-and-sre`     | ⬜               | ⬜                |

> **Legend:**
>
> - **✅:** Completed and merged.
> - **✏️:** In progress / Draft exists.
> - **⬜:** Not started.

---

## 📦 Source File Structure

The main content files for the documentation are located in the `pages` directory.

| Path           | Description                                                                             |
| :------------- | :-------------------------------------------------------------------------------------- |
| `public/`      | Contains static assets like images, fonts, and the domain model diagram (`domain.png`). |
| `src/app/`     | Logic for rendering MDX                                                                 |
| `src/content/` | Contains the pages' MDX content                                                         |

---

## 🤝 Contribution

We welcome contributions to improve the quality and completeness of our documentation.

1.  Create a branch for your new document or update: `git checkout -b docs/add-page-name`
2.  Add your content inside the `content` directory.
3.  Update the **Documentation Progress Tracker** above with the status of your contribution.
4.  Commit your changes and open a Pull Request.
