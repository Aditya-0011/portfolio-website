# Portfolio website

The public portfolio frontend for the platform.

## Overview

This repository holds the source code for the public-facing personal portfolio website. It acts as the presentation layer, connecting to the platform's backend infrastructure to fetch profiles, experiences, projects, and technologies, while providing a responsive design.

## Features

This section outlines the capabilities of the portfolio website.

- **Responsive design**: Works on desktop and mobile devices.
- **Installable app**: Supports Progressive Web App (PWA) standards for installation.
- **Dynamic content**: Fetches and renders the featured experience, projects, and technology stack. It uses secure server-to-server API keys to communicate with the platform backend.
- **Search Engine Optimization (SEO)**: Optimized for search engines and social sharing.

## Getting started

This section explains how to run the portfolio website locally.

### Prerequisites

- [Bun](https://bun.sh/) to manage dependencies and run scripts

### Running locally

Install dependencies and start the development server:

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

Compile the application into static assets for deployment:

```bash
bun run build
bun start
```

## Management backend

The manager service manages the content displayed on this portfolio. Contact the author for source code and deployment details of the backend infrastructure.
