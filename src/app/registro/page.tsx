"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cadenaId, setCadenaId] = useState("1");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/registro.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, cadena_id: cadenaId }),
      }
    );

    const data = await res.json();
    if (data.success) {
      setMensaje("✅ Usuario registrado correctamente.");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMensaje(data.error || "❌ Error al registrar.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Encabezado */}
      <div
        style={{ backgroundColor: "#ff0" }}
        className="w-full py-12 flex flex-col items-center"
      >
        <img src="/logo.webp" alt="Logo" className="w-72 mb-2" />
        <h1 className="text-2xl font-bold text-black">Crea tu cuenta</h1>
      </div>

      {/* Formulario con animación */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto bg-white -mt-10 p-8 rounded-2xl shadow-xl border border-gray-200"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full bg-gray-100 border border-gray-300 p-3 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full bg-gray-100 border border-gray-300 p-3 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-gray-100 border border-gray-300 p-3 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full bg-gray-100 border border-gray-300 p-3 rounded-md"
            value={cadenaId}
            onChange={(e) => setCadenaId(e.target.value)}
          >
            <option value="1">CINEMEX</option>
            <option value="2">CINEPOLIS</option>
            <option value="3">SANBORNS</option>
            <option value="4">FISHERS</option>
            <option value="5">TAQUEARTE</option>
            <option value="6">SUSHI ROLL</option>
            <option value="7">SANTAS ALITAS</option>
            <option value="8">GRUPO MYT</option>
            <option value="9">MI GUSTO ES</option>
            <option value="10">GRUPO DINIZ</option>
          </select>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-full hover:bg-gray-900 transition"
          >
            Crear cuenta
            <span
              style={{ backgroundColor: "#ff0" }}
              className="rounded-full p-2 flex items-center justify-center"
            >
              <Image
                src="/flecha.svg"
                alt="Flecha"
                width={20}
                height={20}
                className="rotate-180"
              />
            </span>
          </button>

          {mensaje && (
            <p className="text-sm text-center text-gray-700">{mensaje}</p>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </motion.div>
    </div>
  );
}
