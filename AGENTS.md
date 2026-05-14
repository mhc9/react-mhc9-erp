# AGENTS.md

- **Start dev server**: `npm start` – runs CRA on http://localhost:3000.
- **Run tests**: `npm test` (CRA Jest watcher). To run a single test file: `npm test -- <path/to/file.test.js>`.
- **Build for production**: `npm run build` (uses `--max_old_space_size=4096`).

**Environment / Build prerequisites**
1. Set the correct `REACT_APP_API_URL` in `.env.local` before building:
   - Development: `REACT_APP_API_URL="http://localhost:8081/laravel80-mhc9-erp/public"`
   - Production: uncomment and set the production URL.
2. In `package.json` ensure the `homepage` field is set to the production base URL (e.g., `"homepage": "https://app.mhc9dmh.com/erp/"`).
3. In the router component (`src/App.js` or similar) set `basename="/erp"` so the app works under the sub‑path.
4. Remove hard‑coded email/password values from the `initialValues` prop in the Login view before committing.

**Key project structure**
- `src/api/index.js` – custom Axios instance with JWT interceptor.
- `src/features/store.js` – central Redux store configuration.
- `src/features/services/` – RTK Query service definitions (preferred for data fetching).
- `src/features/slices/` – Redux slices for local/global state.
- `src/views/` – page components organized by domain (Asset, Loan, Procurement, …).
- `src/components/` – reusable UI components, layout helpers, and document preview utilities.
- `src/utils/index.js` – Thai‑specific utilities (date handling with Buddhist Era, Baht currency formatting, expense calculations).

**Routing**
- Protected routes are wrapped with `<GuardRoute>` in `src/App.js`.
- Main pages use `DefaultLayout`.

**Styling**
- Primary UI libraries: Tailwind CSS + DaisyUI, Bootstrap 5, and legacy Material‑UI components.

**Testing notes**
- CRA’s default Jest config is used; no extra setup required.
- Single test execution: `npm test -- <path/to/file.test.js>`.

**Reference**
- See `GEMINI.md` for a deeper project overview and conventions.
