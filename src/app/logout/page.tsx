"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Borrar token de localStorage
    localStorage.removeItem("token");

    // Borrar cookie del token
    document.cookie = "token=; path=/; max-age=0";

    // Redirigir a login
    router.push("/login");
  }, []);

  return (
    <div className="p-6 text-center">
      <p className="text-gray-600">Cerrando sesión...</p>
    </div>
  );
}
