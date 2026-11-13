import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><head><title>Catálogo de Produtos</title></head><body><AuthProvider>{children}</AuthProvider></body></html>;
}
