"use client";
export const dynamic = "force-dynamic"; // 🔐 Fuerza que el middleware se ejecute

import { useRouter } from "next/navigation";

export default function UsuarioPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; path=/;";
    router.push("/login");
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Bienvenido Usuario</h1>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Cerrar sesión
      </button>
    </main>
  );
}
