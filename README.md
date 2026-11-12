# Product Catalog — Frontend

Responsive product catalog built with **Next.js 15, React 19, and TypeScript**. It connects to a separate REST API for product records and inventory operations.

**[Live demo](https://product-catalog-pink.vercel.app/)** · **[Backend repository](https://github.com/jlcambraia/product-catalog-backend)**

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
- User authentication and authorization
- Persistent favorites
- Inventory metrics dashboard
- Automated tests

## Author

**João Luiz Cambraia** · [GitHub](https://github.com/jlcambraia) · [LinkedIn](https://www.linkedin.com/in/joaoluizcambraia/)
