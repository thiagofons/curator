# 🏛️ Curator

[![Deploy Documentation](https://github.com/thiagofons/curator/actions/workflow/deploy-docs.yml/badge.svg)](https://github.com/thiagofons/curator/actions/workflow/deploy-docs.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Welcome to the Curator platform monorepo. This repository contains all applications, services, and infrastructure code for the Curator project.

Our mission is to combat shallow, low-context content by providing "Lifelong Learners" with curated, in-depth learning journeys. We act as a "sommelier of culture," guiding users through the best books, films, albums, and articles on any given topic in a logical, meaningful sequence.

This project is built on a foundation of **Domain-Driven Design (DDD)**, **Microservices**, **100% Infrastructure as Code (IaC)**, and **Event-Driven Architecture**.

---

## 🚀 Getting Started (Developer Golden Path)

This monorepo is managed using **pnpm** and **Turborepo**.

### 1. Prerequisites

Before you begin, ensure you have the following tools installed:

- **pnpm:** (v8 or higher)
- **Node.js:** (v20 or higher)
- **Terraform:** (v1.5 or higher)
- **AWS CLI:** (v2)

### 2. Installation

Clone the repository and install all dependencies using `pnpm`:

```bash
# Clone the repository
git clone [https://github.com/thiagofons/curator.git](https://github.com/thiagofons/curator.git)
cd curator

# Install all dependencies across all apps and packages
pnpm install
```
