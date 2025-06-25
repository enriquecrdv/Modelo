// /components/FormLogin.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("La respuesta del servidor no es válida.");
      }

      const data = await res.json();
      console.log("🔐 Respuesta del backend:", data);

      if (!res.ok) {
        const msg =
          data.message || "Error al iniciar sesión. Verifica tus datos.";
        setErrorMsg(msg);
        return;
      }

      if (!data.token) {
        setErrorMsg("No se recibió token. Contacta al administrador.");
        return;
      }

      const decoded: any = jwtDecode(data.token);
      const rol = decoded.rol || "usuario";

      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/; max-age=3600`;

      if (rol === "admin") {
        router.push("/admin");
      } else if (rol === "usuario") {
        router.push("/usuario");
      } else {
        setErrorMsg("Rol no reconocido. Contacta a soporte.");
      }
    } catch (err: any) {
      console.error("❌ Error en login:", err);
      setErrorMsg(
        "No se pudo conectar con el servidor. Verifica la URL en .env.local"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Fondo amarillo con logo y encabezado */}
      <div
        style={{ backgroundColor: "#ff0" }}
        className="w-full py-12 flex flex-col items-center"
      >
        <img src="/logo.webp" alt="Logo" className="w-72 mb-2" />
        <h1 className="text-2xl font-bold text-black">Ingrese su cuenta</h1>
      </div>

      {/* Contenedor del formulario */}
      <div className="max-w-md mx-auto bg-white -mt-10 p-8 rounded-2xl shadow-xl border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full bg-gray-100 border border-gray-300 p-3 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <div className="text-right">
            <a href="#" className="text-blue-600 text-sm">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
            <span className="flecha"></span>
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Quieres ser parte?{" "}
          <Link
            href="/registro"
            className="text-blue-600 font-semibold hover:underline"
          >
            Registra tu cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
