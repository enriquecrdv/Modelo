"use client";

import { useState } from "react";

export default function TestAdminPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch(
        "https://maniobrando.site/api/crear-usuario.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            correo,
            contrasena,
            rol: "admin",
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMensaje("✅ Administrador creado correctamente.");
        setNombre("");
        setCorreo("");
        setContrasena("");
      } else {
        setMensaje(
          `❌ Error: ${data.message || "No se pudo crear el usuario."}`
        );
      }
    } catch (error) {
      setMensaje("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Crear Administrador</h1>
      {mensaje && <p className="mb-4 text-sm">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Crear administrador
        </button>
      </form>
    </div>
  );
}
