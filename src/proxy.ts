import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/adminEmail";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Admin — restricted to the treasurer's Google account
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (req.auth?.user?.email !== ADMIN_EMAIL) {
      const url = new URL("/admin/login", req.url);
      if (req.auth) url.searchParams.set("error", "AccessDenied");
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Grant application — Harvard OAuth protection
  if (pathname === "/grant-application" && !req.auth) {
    return NextResponse.redirect(new URL("/grant-application/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/grant-application", "/admin/:path*"],
};
