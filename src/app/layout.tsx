// src/app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/app/context/auth-context"; // ✅ IMPORTANTE

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modelo | Plataforma de Registro",
  description: "Alta de clientes y reportes de fallas para Grupo Modelo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
