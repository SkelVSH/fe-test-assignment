# FE Test Assignment

## Project Overview

This project uses TypeScript, Vite, Eslint and Prettier for code quality.

## Architectural Decisions

### Frameworks and Libraries

- **React 19**: Chosen for its component-based architecture and ecosystem.
- **TypeScript**: Provides static typing for better code quality and maintainability.
- **Vite**: Selected for its fast build times and modern tooling.

### Code Quality Tools

- **ESLint**: Configured with TypeScript and React plugins to enforce best practices.
- **Prettier**: Ensures consistent code formatting.

### TypeScript Configuration

- Paths are aliased for cleaner imports (e.g., `@components/*`, `@assets/*`).
- Strict mode is enabled for better type safety.

### Project Structure

- **src/**: Contains application source code.
  - **App.tsx**: Main application component.
  - **index.tsx**: Entry point for rendering the React app.
  - **assets/**: Stores static assets like SVGs.
  - **vite-env.d.ts**: TypeScript declaration for Vite environment.
- **public/**: Contains public files like `index.html` and `favicon.ico`.
- **dist/**: Output folder for production builds.

### Package Management

- Dependencies are managed via `yarn`.
- Scripts are defined in `package.json` for common tasks.

## Available Scripts

### `yarn dev`

Runs the app in development mode.

### `yarn build`

Builds the app for production.

- Outputs optimized files to the `dist` folder.

### `yarn lint`

Runs ESLint to check for code quality issues.

- Ensures adherence to coding standards.
- Reports unused directives and enforces zero warnings.

### `yarn format`

Formats code using Prettier.

- Applies consistent styling to all files.
- Targets `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.md`, and `.json` files.

## Additional Notes

- This project is configured for modern browsers as per the `browserslist` settings.
- The development environment supports React's Strict Mode for highlighting potential issues.
