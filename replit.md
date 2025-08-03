# InitraJS Website

## Overview

This is a modern, sleek website for InitraJS - a fullstack scaffolding CLI that accelerates React, Next.js, and Node.js development with zero-config setups. The site serves as both a landing page and documentation portal, featuring interactive demos, code examples, and comprehensive information about the CLI's capabilities. Built with React, Vite, TypeScript, and Three.js for dynamic visual effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a **React + Vite** frontend architecture with TypeScript for type safety. The UI is built with **shadcn/ui components** and **Tailwind CSS** for styling, following a dark theme design system. The application leverages **wouter** for client-side routing instead of React Router, providing a lightweight navigation solution.

**Component Structure**: Components are organized using the shadcn/ui pattern with separate UI components in `@/components/ui/` and page-specific components. The main application structure includes:
- Single-page application with sections for hero, features, playground, templates, roadmap, and community
- Three.js integration for subtle 3D background animations
- GSAP for smooth scroll-triggered animations and transitions

**State Management**: Uses React Query (@tanstack/react-query) for server state management and caching, with local component state for UI interactions.

### Backend Architecture
The backend follows an **Express.js** server architecture with TypeScript support. It implements a clean separation of concerns with:
- Route registration system in `server/routes.ts`
- Storage abstraction layer with in-memory implementation
- Middleware for request logging and error handling
- Development-specific Vite integration for hot module replacement

**Development Setup**: The server integrates with Vite in development mode for seamless full-stack development, serving the React application and providing API endpoints under the `/api` prefix.

### Build System
**Vite Configuration**: Uses Vite as the primary build tool with React plugin support and custom alias configuration for clean imports. The build process:
- Builds the frontend to `dist/public`
- Bundles the backend using esbuild for production deployment
- Supports both development and production modes with different optimization strategies

**TypeScript Setup**: Comprehensive TypeScript configuration covers client, server, and shared code with strict type checking and modern ES modules support.

### Styling Architecture
**Design System**: Implements a custom design system using CSS variables for theming, with a dark-first approach. The color palette emphasizes orange accents (#fd7d1a) as the primary brand color.

**Component Library**: Built on top of Radix UI primitives with custom styling through Tailwind CSS classes, providing accessible and consistent UI components throughout the application.

### Animation System
**GSAP Integration**: Uses GSAP (GreenSock Animation Platform) for high-performance animations including:
- Scroll-triggered animations with ScrollTrigger plugin
- Staggered element animations for list items
- Text animations and morphing effects
- Custom easing functions and timeline controls

**Three.js Background**: Implements a particle system background using Three.js for subtle visual enhancement without impacting performance.

## External Dependencies

### UI Framework
- **React 18** with TypeScript for component-based architecture
- **Vite** as the build tool and development server
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library built on Radix UI primitives

### Animation Libraries
- **GSAP (GreenSock)** for advanced animations and scroll effects
- **Three.js** for 3D background particle effects
- **Framer Motion** (referenced in brief but not implemented)

### Backend Runtime
- **Node.js** with Express.js framework
- **TypeScript** for both frontend and backend development
- **esbuild** for backend bundling in production

### Database Integration
- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **@neondatabase/serverless** for serverless PostgreSQL connections
- Database migrations supported through drizzle-kit

### Development Tools
- **@replit/vite-plugin-runtime-error-modal** for enhanced error reporting
- **@replit/vite-plugin-cartographer** for development tooling
- **wouter** for lightweight client-side routing

### Fonts and Icons
- **Google Fonts** (Inter and JetBrains Mono) for typography
- **Lucide React** for consistent iconography throughout the interface

### Form Handling
- **React Hook Form** with **@hookform/resolvers** for form validation
- **Zod** schema validation integrated with Drizzle ORM

The architecture prioritizes developer experience with hot module replacement, TypeScript support, and modern development tooling while maintaining production performance through optimized builds and efficient asset loading.