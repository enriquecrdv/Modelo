import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

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

export const config = {
  matcher: ["/admin/:path*", "/usuario/:path*"],
};
