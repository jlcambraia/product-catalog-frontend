# Product Catalog — Frontend

Responsive product catalog built with **Next.js 15, React 19, and TypeScript**. It connects to a separate REST API for product records and inventory operations.

**[Live demo](https://product-catalog-pink.vercel.app/)** · **[Backend repository](https://github.com/jlcambraia/product-catalog-backend)**

## Demo access (feature branch)

The catalog is public: browsing, searching, and filtering do not require a login.

To try the admin interface in the preview deployment, use:

- **Username:** `demo`
- **Password:** `catalogo-demo`

These credentials are **public and intentionally not secure**. They are exclusively for a learning/portfolio demo, not for real administrative accounts. The session is a simple demo cookie, not production-grade authentication.

**Data safety:** the Next.js API proxy permits product reads only. Create, delete, and stock changes are simulated in your own browser using `sessionStorage`. They do **not** modify the shared MongoDB database and disappear when the browser session storage is cleared. This is not a production authentication or inventory system.

The preview still needs `BACKEND_API_URL` pointing to the running backend for public product reads (the legacy `NEXT_PUBLIC_MAINAPI_BASE_URL` is accepted as fallback). No Redis, Argon2 hash, or session secret is required for this demo login.

## Features

- Browse products and view details
- Search by product name, description, category, or price
- Filter products by category
- Add and delete products
- Mark favorites in the current React session (not persisted to the database)
- Record inventory consumption on a dedicated production page
- Responsive interface

## Tech stack

Next.js 15 · React 19 · TypeScript · CSS Modules · REST API · Vercel

## Architecture

```text
Next.js / React frontend
          |
       REST API
          |
Node.js / Express backend
          |
        MongoDB
```

## Run locally

Requires Node.js, npm, and the [Product Catalog backend](https://github.com/jlcambraia/product-catalog-backend) running locally or remotely.

```bash
git clone https://github.com/jlcambraia/product-catalog-frontend.git
cd product-catalog-frontend
npm install
```

Create `.env.local` at the project root:

```env
NEXT_PUBLIC_MAINAPI_BASE_URL=http://localhost:3001
```

Change the URL to match your backend configuration.

```bash
npm run dev
```

Visit http://localhost:3000.

To create and run a production build:

```bash
npm run build
npm run start
```

## Potential improvements

- Pagination or infinite scrolling
- Production-grade authentication and authorization (demo access is intentionally public)
- Persistent favorites
- Inventory metrics dashboard
- Automated tests

## Author

**João Luiz Cambraia** · [GitHub](https://github.com/jlcambraia) · [LinkedIn](https://www.linkedin.com/in/joaoluizcambraia/)
