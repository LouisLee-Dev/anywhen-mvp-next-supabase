import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { updateSession } from "@/core/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    /* "/((?!api|_next/static|_next/image|favicon.ico|auth|t/telos-tracker.min.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)", */
    "/pm",
    "/renters",
  ],
};
