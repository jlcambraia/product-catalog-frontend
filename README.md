# Product Catalog

A responsive product catalog with a **public storefront** and a **safe, interactive admin demo**. Built as a full-stack learning and portfolio project, with a Next.js frontend and a separate Express/MongoDB API.

**Tech:** Next.js 15 · React 19 · TypeScript · CSS Modules · Node.js · Express 5 · MongoDB · Mongoose

[Current public deployment](https://product-catalog-pink.vercel.app/) · [Frontend source](https://github.com/jlcambraia/product-catalog-frontend) · [Backend source](https://github.com/jlcambraia/product-catalog-backend) · [Demo feature PR](https://github.com/jlcambraia/product-catalog-frontend/pull/1)

> **Version note:** The public deployment may still be running the default branch. To try the latest features described here, use the Vercel **Preview** linked to the `feature/admin-auth-phase1` pull request. The branch is not merged into `main`.

## Features

### Public catalog (no login required)

- Browse products, prices, images, and details.
- Search by product name, description, category, or price.
- Filter by product category.
- Add and remove favorites during the current React session.
- Responsive layout for desktop and mobile.

### Admin demo

- Log in with public demonstration credentials.
- Add products using the original creation form.
- Use the built-in collection of example image URLs.
- Delete products from the demo view.
- Simulate inventory consumption on the `/production` page.
- **Restore catalog** to discard all simulated changes and reload the original products.
- Receive confirmation feedback after adding products and restoring the catalog.

All creation, deletion, and stock changes in the demo are **simulated in the visitor's browser**. The Next.js demo does not write to MongoDB.

## Try the admin demo

1. Open the latest Vercel **Preview** for this branch.
2. Click **Entrar** (or open `/admin/login`).
3. Sign in with:

| Field | Value |
| --- | --- |
| Username | `demo` |
| Password | `catalogo-demo` |

4. Use **Adicionar produto**, **Links de imagens**, and **Restaurar catálogo** in the demo toolbar.

> These credentials are intentionally public. This is a learning/demo login, **not production-grade authentication**. Never reuse these credentials for any real account.

### What happens to demo changes?

| Action | Where it is stored | Affects MongoDB? |
| --- | --- | --- |
| Browse or search products | Read from the backend via Next.js | No |
| Create a product | Browser `sessionStorage` | No |
| Delete a product | Browser `sessionStorage` (hidden locally) | No |
| Consume stock | Browser `sessionStorage` | No |
| Restore catalog | Clears demo changes and reloads products | No |
| Mark favorites | React state (current page session) | No |

The demonstration uses the storage key `product-catalog-demo-changes-v1`. Refreshing the page can preserve demo changes **in that tab's session**. Signing out does not automatically reset them. Use **Restaurar catálogo** to clear them immediately, or clear the tab's session storage. Other visitors do not see your changes.

## Architecture

```text
Browser (Next.js / React)
  |
  +-- Public catalog and search
  |      |
  |      +-- GET /api/products (Next.js route)
  |                |
  |                +-- GET /products (Express API)
  |                          |
  |                          +-- MongoDB / Mongoose
  |
  +-- Admin demo (public demo login)
         |
         +-- Create / delete / stock -> browser sessionStorage
         +-- Restore catalog -> clear sessionStorage + reload GET
```

**Important distinction:** The separate Express backend implements real database write endpoints. The demo frontend's `POST /api/products`, `DELETE /api/products/:id`, and `PATCH /api/products/:id/stock` routes deliberately return `403` so that demo actions cannot modify the shared database *through the Next.js proxy*.

## Run locally

Requires **Node.js 22**, npm, and access to a running instance of the [backend API](https://github.com/jlcambraia/product-catalog-backend).

```bash
git clone https://github.com/jlcambraia/product-catalog-frontend.git
cd product-catalog-frontend
git switch feature/admin-auth-phase1
npm ci
```

Create a `.env.local` file in the frontend project root:

```dotenv
# Express backend origin only; do not append /products
BACKEND_API_URL=http://localhost:3001

# Optional: origin hosting the sample product images
NEXT_PUBLIC_ASSETS_BASE_URL=http://localhost:3001
```

If your backend is on Render or another host, replace the URL accordingly. `NEXT_PUBLIC_MAINAPI_BASE_URL` is supported as a **legacy fallback**, but `BACKEND_API_URL` is recommended for new setups.

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and visit `/admin/login` to test the admin demo. If you also run the **backend feature branch** locally, configure its `MONGO_URL` and `INTERNAL_API_KEY` as described in that repository; the backend requires both even though the demo frontend only reads products.

### Available commands

```bash
npm run dev           # Development server
npm run lint          # ESLint
npx tsc --noEmit      # TypeScript check
npm run build         # Optimized Next.js build
npm run start         # Start the compiled app
```

A GitHub Actions workflow is configured to validate changes on the demo feature branch. Always review the latest build/check results before merging.

## Deploying the demo to Vercel

1. Import the **frontend repository** into Vercel.
2. Use `feature/admin-auth-phase1` for a Preview deployment while testing.
3. Configure `BACKEND_API_URL` with the reachable Express API origin (for example, `https://your-backend.onrender.com`).
4. Optionally configure `NEXT_PUBLIC_ASSETS_BASE_URL` for the sample image links.
5. Check the build, public catalog, demo login, add/delete, favorites, inventory, and **Restore catalog** in Preview.

For this demo login you do **not** need Upstash Redis, an Argon2 password hash, or a JWT session secret. The login implementation uses an intentionally simple two-hour demo cookie; it must not be reused for a real administration system.

### Security and deployment limitations

**Do not treat the demo login as authorization for real database changes.** The frontend's read-only proxy protects only requests that go through the frontend. A publicly accessible backend can still be called **directly**.

- The backend `feature/admin-auth-phase1` branch requires an `X-Internal-API-Key` header for write operations; keep `INTERNAL_API_KEY` secret on the backend.
- The backend's original `main` implementation does **not** protect its create, delete, or stock routes. If that version is deployed publicly, real database writes may still be possible through its direct URL.
- Before promoting the demo to a public production deployment, deploy or verify the **protected backend**, review environment variables, and test the backend write endpoints without a key.

The demo is designed to **showcase CRUD interactions safely**, not to serve as a real multi-user inventory manager.

## Possible next steps

- Production-ready authentication and role-based authorization for a real admin panel.
- Shared, persistent favorites for signed-in users.
- Pagination and inventory reporting.
- Automated end-to-end tests and UI regression coverage.

## Author

**João Luiz Cambraia**

[GitHub](https://github.com/jlcambraia) · [LinkedIn](https://www.linkedin.com/in/joaoluizcambraia/)
