# Portfolio Website

The public portfolio frontend for the platform.

[![React Version](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## Overview

The portfolio website acts as the public-facing presentation layer for the platform. It interfaces securely with the `gateway` API via a long-lived API key to fetch dynamic profiles, experiences, projects, and technologies from the headless CMS (`manager` service).

## Architecture

This section explains the technologies and physical layout of the portfolio website.

- **Framework**: Built with React 19 and Next.js 16 (App Router)
- **Package manager**: Managed and executed using `bun`
- **Styling**: Styled with Tailwind CSS v4 and `lucide-react` icons
- **State**: Uses Next.js Server Components and aggressive server-side caching for data fetching. Uses `@tanstack/react-form-nextjs` for complex form handling.
- **Routing**: Server-side and client-side navigation handled natively by Next.js App Router

### Project structure

- `app/`: Next.js App Router pages, layouts, and global styles
- `components/`: Reusable React components for UI elements
- `data/`: Server-side data fetching and integration logic
- `lib/`: Utility functions and Zod schemas
- `public/`: Static assets

## Features

This section outlines the capabilities of the portfolio website.

- **Performance**: Built on Next.js 16 with React Compiler and view transitions enabled.
- **Design**: Fully responsive, mobile-first design using Tailwind CSS.
- **Installable app**: Supports Progressive Web App (PWA) standards for native-like installation.
- **Type-safe validation**: Server API responses and contact forms validate strictly using `zod`.
- **Search Engine Optimization**: Optimized for search engines with server-side rendering and automatic metadata.

## Platform routing

The portfolio maps to the public-facing routes:

- `/`: The home page featuring the profile, work timeline, and core technologies
- `/projects`: The dedicated showcase of featured applications and services
- `/contact`: A secure contact form protected by Cloudflare Turnstile

## Getting started

This section explains how to run the portfolio website locally.

### Prerequisites

- [Bun](https://bun.sh/) to manage dependencies and run scripts

### Configuration

Export these variables directly in your `.env` file:

| Variable                         | Description                                             | Required |
| :------------------------------- | :------------------------------------------------------ | :------: |
| `MANAGER_BACKEND_URL`            | Base URL of the API Gateway / manager service           | **Yes**  |
| `API_KEY`                        | Long-lived API key to authenticate with the API Gateway | **Yes**  |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key                         | **Yes**  |
| `TURNSTILE_SECRET_KEY`           | Cloudflare Turnstile secret key                         | **Yes**  |
| `MAIL_HOST`                      | SMTP server host                                        | **Yes**  |
| `MAIL_USER`                      | SMTP server user                                        | **Yes**  |
| `MAIL_PASS`                      | SMTP server password                                    | **Yes**  |
| `MAIL_FROM`                      | Email address to send contact form submissions from     | **Yes**  |
| `MAIL_TO`                        | Email address to receive contact form submissions       | **Yes**  |
| `ARCHITECTURE_URL`               | URL to fetch the dynamic architecture README            |    No    |
| `CLARITY_KEY`                    | Microsoft Clarity analytics ID                          | **Yes**  |
| `G_TAG`                          | Google Analytics tag ID                                 | **Yes**  |
| `ENV`                            | Specifies the current environment mode                  |    No    |

### Running locally

Install dependencies and start the development server:

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

Compile the application into static HTML, CSS, and JS assets for deployment:

```bash
bun run build
bun start
```
