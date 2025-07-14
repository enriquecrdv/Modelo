"use client";
export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <p>
        Bienvenido, este módulo solo está disponible para{" "}
        <strong>usuarios con rol admin</strong>.
      </p>
    </main>
  );
}
