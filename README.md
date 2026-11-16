# Product Catalog

A full-stack product catalog built with **Next.js 15.5.29, React 19, TypeScript, Express 5, and MongoDB**. The project combines a responsive storefront with an interactive admin demo for exploring product management and inventory workflows.

**[Live demo](https://product-catalog-pink.vercel.app/)** · **[Backend repository](https://github.com/jlcambraia/product-catalog-backend)**

## What you can explore

### Product catalog
- Browse a product collection with images, descriptions, prices, and categories.
- Search products and filter the catalog by category.
- Mark favorites while browsing.
- Use the responsive interface across desktop and mobile screens.

### Admin demo
- Sign in to the demonstration area.
- Create products with validation and sample image options.
- Remove products and simulate stock consumption.
- Restore the catalog to its original state.

**Demo changes are isolated to each visitor's browser.** Create, delete, and stock operations are simulated using `sessionStorage`, rather than changing the shared MongoDB collection. The public catalog reads products through a Next.js API route backed by the Express service.

## Technologies

| Layer | Technologies |
| --- | --- |
| Frontend | Next.js 15.5.29 (App Router), React 19, TypeScript, CSS Modules |
| API | Node.js, Express 5, REST |
| Database | MongoDB, Mongoose |
| Deployment | Vercel (frontend), hosted backend API |

## Demo access

1. Open the [live demo](https://product-catalog-pink.vercel.app/).
2. Select **Entrar** or navigate to `/admin/login`.
3. Use the demonstration credentials below:

| Field | Value |
| --- | --- |
| Username | `demo` |
| Password | `catalogo-demo` |

These credentials are intentionally public and are **only for the demo**. They are not suitable for real user accounts or production administration.

In the demo, **Restaurar catálogo** resets simulated product additions, deletions, and stock changes in your browser. Favorites are kept in React state and are not synced to other visitors.

## Architecture

```text
Browser
  |
  +-- Next.js App Router
       |
       +-- Public catalog / search / favorites
       |      |
       |      +-- GET /api/products
       |             |
       |             +-- Express GET /products
       |                    |
       |                    +-- MongoDB / Mongoose
       |
       +-- Demo admin / simulated inventory
              |
              +-- Browser sessionStorage (no writes to MongoDB)
```

Next.js read requests are forwarded to the Express API. Demo write requests through the Next.js proxy are disabled, and the demo UI stores changes locally.

### Free-tier backend availability

The backend may pause after periods of inactivity. When this happens, the first catalog request can take longer than usual. The interface shows a longer-loading explanation and a **Tentar novamente** action if loading fails.

The frontend waits up to 55 seconds for a backend response, subject to the hosting provider's execution limits. A temporary failure does not mean the catalog was deleted or that the demo data was changed.

## Run locally

**Prerequisites:** Node.js 22, npm, and access to a running instance of the [backend API](https://github.com/jlcambraia/product-catalog-backend).

```bash
git clone https://github.com/jlcambraia/product-catalog-frontend.git
cd product-catalog-frontend
npm ci
```

Create `.env.local` in the project root:

```dotenv
BACKEND_API_URL=http://localhost:3001
NEXT_PUBLIC_ASSETS_BASE_URL=http://localhost:3001
```

Set `BACKEND_API_URL` to the Express server's origin, **without** appending `/products`. The assets URL is optional. The legacy `NEXT_PUBLIC_MAINAPI_BASE_URL` environment variable is supported as a fallback.

Start the application:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful commands

```bash
npm run dev         # Development server
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript check
npm run build       # Production build
npm run start       # Run a production build
```

## Deployment and security notes

The frontend is designed as a portfolio demo, not a production inventory-management service.

- The Next.js proxy deliberately rejects demo write methods; creating, deleting, and changing stock in the UI do not modify the shared database.
- Protect the **Express API itself** before exposing write endpoints to the internet. Frontend-only restrictions cannot secure direct backend calls.
- The backend includes support for an `X-Internal-API-Key` check on write operations. A public read-only demo should run with write access disabled or fully protected.
- Keep backend connection strings and internal keys out of client-side environment variables and source control.
- Demo authentication is intentionally limited and must not be reused for a real admin system.

To deploy, configure the frontend project's `BACKEND_API_URL` to the reachable Express service, build on Vercel, and verify API connectivity, demo login, and the read-only behavior of the shared backend.

## Possible improvements

- Production-ready authentication and role-based permissions
- Shared favorites and persistence for authenticated users
- Catalog pagination and richer inventory reports
- Automated end-to-end tests and accessibility audits

## Author

**João Luiz Cambraia**

[GitHub](https://github.com/jlcambraia) · [LinkedIn](https://www.linkedin.com/in/joaoluizcambraia/)
