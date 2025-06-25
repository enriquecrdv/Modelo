/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // ✅ Esto sí es válido
  },
  // ❌ IMPORTANTE: aquí *NO* va 'matcher' — ese va dentro de `middleware.ts`
};

export default nextConfig;
