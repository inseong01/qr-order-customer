import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "./lib/supabase/middleware";
import { validateDevice } from "./util/middleware/validate-device";
import { validateTableURL } from "./util/middleware/validate-url";
import { setTableCookie } from "./util/middleware/set-table-cookie";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // /table/[번호]/[하위 페이지]
  if (pathname.split("/").length > 3) {
    const urlResult = validateTableURL(request);
    if (urlResult) return urlResult;
  }

  // table/*
  if (pathname.startsWith("/table")) {
    const deviceResult = validateDevice(request);
    if (deviceResult) return deviceResult;

    const tableResult = await setTableCookie(request);
    if (tableResult) return tableResult;

    const sessionResult = await updateSession(request);
    if (sessionResult) return sessionResult;
  }

  return NextResponse.next();
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
