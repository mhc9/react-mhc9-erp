# react-mhc9-erp

A comprehensive Enterprise Resource Planning (ERP) system built with React, designed for MHC9.

## Project Overview

This project is a feature-rich React application that manages various aspects of an organization, including IT helpdesk, procurement, loan management, and general system data (employees, assets, budgets, etc.). It communicates with a Laravel backend.

### Key Technologies

- **React 18**: Frontend framework.
- **React Router 6**: Client-side routing with protected routes (`GuardRoute`).
- **Redux Toolkit**: State management, utilizing both traditional slices and **RTK Query** for API interactions.
- **Tailwind CSS & DaisyUI**: Utility-first styling and component library.
- **Bootstrap 5**: Used for some layout and components (`react-bootstrap`).
- **Material UI (Legacy)**: Partial usage of `@material-ui/core` and pickers.
- **Axios**: HTTP client for API requests.
- **Formik & Yup**: Form management and validation.
- **Moment.js**: Date manipulation, with specific utilities for Thai Buddhist Era (BE).
- **Reporting**: Integration with DevExpress Reporting and Stimulsoft Reports JS.

## Getting Started

### Prerequisites

- Node.js (version compatible with CRA 5)
- npm or yarn

### Installation

```bash
npm install
```

### Available Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production (uses `--max_old_space_size=4096`).
- `npm test`: Launches the test runner.

## Development Conventions

### Architecture

- **`src/api/index.js`**: Custom Axios instance with interceptors for JWT authentication.
- **`src/features/store.js`**: Central Redux store configuration.
- **`src/features/services/`**: RTK Query service definitions for API communication.
- **`src/features/slices/`**: Redux slices for local and global state.
- **`src/views/`**: Page components organized by module (e.g., `Asset`, `Loan`, `Procurement`).
- **`src/components/`**: Reusable UI components, layouts, and document previews.

### Routing

- Protected routes are wrapped in `<GuardRoute>` in `App.js`.
- Most main views use `DefaultLayout`.

### Utilities (`src/utils/index.js`)

The project includes specialized utilities for the Thai context:
- **Date Handling**: Functions like `toLongTHDateWithBE` handle conversion between Gregorian and Thai Buddhist Era years (adding 543).
- **Currency**: `Intl.NumberFormat('th-TH', ...)` is used for Baht formatting.
- **Calculations**: Specific logic for expense patterns and totals.

### Build Precautions (from README)

Before building for production:
1. Update `REACT_APP_API_URL` in `.env.local` to the production endpoint.
2. Set `"homepage": "https://app.mhc9dmh.com/erp/"` in `package.json`.
3. Set `basename="/erp"` in the Router component.
4. Clear sensitive initial values in the Login view.

## Coding Style

- Follow standard React and Redux Toolkit patterns.
- Use RTK Query for data fetching whenever possible.
- Adhere to the established module structure in `src/views` and `src/features`.
- Utilize shared utilities for date and currency formatting to ensure consistency across the Thai-localized UI.
