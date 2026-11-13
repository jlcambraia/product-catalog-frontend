// Keep the image suggestions from the original product-catalog demo.
// A public fallback makes the examples usable even when Vercel has no image-base env var.
const configuredBase =
  process.env.NEXT_PUBLIC_ASSETS_BASE_URL ||
  process.env.NEXT_PUBLIC_MAINAPI_BASE_URL ||
  "https://product-catalog-backend-ssr2.onrender.com";

const imageBase = configuredBase.replace(/\/$/, "");

export const EXAMPLE_IMAGES = [
  { label: "Bolsa", url: `${imageBase}/bag.png` },
  { label: "Bolsa (2)", url: `${imageBase}/bag-2.png` },
  { label: "Cadeira", url: `${imageBase}/chair.png` },
  { label: "Monitor", url: `${imageBase}/monitor.png` },
  { label: "Celular", url: `${imageBase}/phone.png` },
  { label: "Tênis", url: `${imageBase}/sneakers.png` },
  { label: "Camiseta", url: `${imageBase}/tshirt.png` },
] as const;
