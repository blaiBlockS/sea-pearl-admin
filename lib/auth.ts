// lib/auth.ts
import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("token")?.value;
  return !!token;
}

export function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  return protectedPaths.some((path) => pathname.startsWith(path));
}
