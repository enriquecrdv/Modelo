import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
console.log("🚨 Middleware activo");
console.log("🔑 Token recibido:", token);

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl;

  console.log("🛡️ Middleware ejecutado:", url.pathname);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded: any = jwtDecode(token);
    const rol = decoded.rol;

    if (url.pathname.startsWith("/admin") && rol !== "admin") {
      return NextResponse.redirect(new URL("/usuario", request.url));
    }

    if (url.pathname.startsWith("/usuario") && rol !== "usuario") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  }
}

// ✅ ESTA CONFIGURACIÓN DEBE ESTAR AQUÍ MISMO (NO EN next.config.ts)
export const config = {
  matcher: ["/"],
};
