<!--
SEO Keywords: AI experimentation platform, React 19, Vite TypeScript, Convex backend, Tailwind CSS v4, shadcn UI, Framer Motion, Hugging Face AI, AI research, machine learning playground, AI web application, serverless AI
-->

<div align="center">

# ArtificialAI

**AI Experimentation & Research Platform — React 19 + Convex + Hugging Face**

*AI Playground · Machine Learning Experiments · Fullstack TypeScript · Real-time AI Inference*

[![React 19](https://img.shields.io/badge/react-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Convex](https://img.shields.io/badge/convex-backend-orange?logo=convex)](https://www.convex.dev/)
[![Hugging Face](https://img.shields.io/badge/huggingface-inference-yellow?logo=huggingface&logoColor=black)](https://huggingface.co/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?logo=opensourceinitiative)](LICENSE)

<p align="center">
  <strong>AI Inference</strong> | <strong>ML Experiments</strong> | <strong>Real-time Backend</strong> | <strong>Modern UI</strong> | <strong>Auth Built-in</strong>
</p>

</div>

---

## Overview

**ArtificialAI** is an AI experimentation and research platform built with modern web technologies. It provides a fullstack TypeScript environment for running AI models, experimenting with machine learning workflows, and building intelligent applications. Powered by React 19, Convex for real-time backend, Tailwind v4 for styling, and Hugging Face Inference for AI model access.

The platform includes a comprehensive UI component library built on Radix UI primitives and shadcn/ui, Framer Motion animations, React Router v7 for navigation, and Convex Auth for authentication — everything needed to prototype, experiment, and deploy AI-powered features quickly.

---

## Features

### AI & Machine Learning
- **Hugging Face Inference** — Direct integration with Hugging Face models for text generation, classification, and more
- **AI Experimentation** — Built-in environment for testing and comparing AI models
- **Real-time Inference** — Live AI responses via Convex real-time queries
- **Research Playground** — Interactive space for ML experiments and prototyping

### Frontend
- **React 19** — Latest React with Server Components and concurrent features
- **TypeScript** — Full type safety across the entire stack
- **Tailwind CSS v4** — Utility-first styling with the latest Tailwind version
- **shadcn/ui** — High-quality UI components built on Radix UI primitives
- **Framer Motion** — Smooth animations and micro-interactions
- **React Router v7** — Modern routing with data loading
- **Radix UI** — Accessible, unstyled component primitives (Accordion, Dialog, Dropdown, Tabs, and 20+ more)
- **Lucide Icons** — Beautiful consistent icon set
- **Ant Design Icons** — Additional icon library
- **React Hook Form** — Performant form handling with Zod validation
- **Faker.js** — Realistic fake data generation for testing

### Backend & Infrastructure
- **Convex** — Real-time backend with automatic reactivity, database, and server functions
- **Convex Auth** — Built-in authentication with multiple providers
- **Serverless Functions** — Convex functions for backend logic without managing servers
- **Real-time Subscriptions** — Live data updates across clients
- **Vite Build** — Lightning-fast development and optimized production builds

### Developer Experience
- **ESLint** — Code quality enforcement
- **Prettier** — Consistent code formatting
- **Hot Module Replacement** — Instant feedback during development
- **Path Aliases** — Clean imports with TypeScript path resolution

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Radix UI |
| Animations | Framer Motion |
| Backend | Convex |
| Auth | Convex Auth |
| AI/ML | Hugging Face Inference API |
| Routing | React Router v7 |
| Forms | React Hook Form + Zod |
| Icons | Lucide React, Ant Design Icons |
| Data Generation | @faker-js/faker |
| Code Quality | ESLint, Prettier |
| License | MIT |

---

## Quick Start

### Prerequisites

- Node.js >= 18
- A Convex account (free tier available)
- Hugging Face API key (free tier available)

### Installation

```bash
git clone https://github.com/yethikrishna/artificialai.git
cd artificialai

# Install dependencies
npm install

# Set up Convex
npx convex dev

# Configure environment variables
cp .env.example .env
# Add your Hugging Face API key and Convex URL

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev        # Start Vite dev server
npm run build      # Type check and build for production
npm run lint       # Run ESLint
npm run format     # Format with Prettier
npm run preview    # Preview production build
```

---

## Project Structure

```
artificialai/
├── src/
│   ├── components/            # React UI components (shadcn/ui + custom)
│   ├── pages/                 # Page components (routed)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and shared logic
│   ├── convex/                # Convex backend functions & schema
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles (Tailwind)
│   ├── instrumentation.tsx    # Observability/tracing setup
│   └── vite-env.d.ts          # Vite type definitions
├── public/                    # Static assets
├── convex.json                # Convex configuration
├── components.json            # shadcn/ui configuration
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript base config
├── tsconfig.app.json          # App TypeScript config
├── tsconfig.node.json         # Node TypeScript config
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── main.ts                    # Main bootstrap
├── package.json               # Dependencies
├── .prettierrc                # Prettier config
├── .prettierignore            # Prettier ignore
├── set-convex-jwt-env.sh      # Convex JWT setup script
└── README.md                  # This file
```

---

## Key Components

The project uses a comprehensive set of Radix UI primitives wrapped as shadcn/ui components:

- **Layout**: Accordion, Collapsible, Tabs, Scroll Area, Separator, Aspect Ratio
- **Forms**: Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider, Label, Form
- **Overlay**: Dialog, Alert Dialog, Popover, Hover Card, Tooltip, Dropdown Menu, Context Menu, Menubar, Navigation Menu
- **Feedback**: Progress, Toast, Skeleton
- **Data**: Table, Avatar, Badge, Card

---

## Deployment

### Convex Deployment

```bash
npx convex deploy
```

### Vercel / Netlify

Connect your repository to Vercel or Netlify for automatic deployments. The build command is `npm run build` and the output directory is `dist/`.

---

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` and `npm run build`
5. Submit a pull request

---

## License

This project is licensed under the MIT License.

---

<div align="center">

**[ArtificialAI](https://github.com/yethikrishna/artificialai)** — Experiment, build, and deploy AI-powered applications.

[Get Started](#quick-start) · [Report Bug](https://github.com/yethikrishna/artificialai/issues) · [Request Feature](https://github.com/yethikrishna/artificialai/issues)

</div>
