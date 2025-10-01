import { checkValidTableValue } from "@/lib/function/middleware/check-valid-table-value";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * 올바른 테이블 접속 검증 미들웨어
 */
export async function validateTableURL(request: NextRequest) {
  const notFoundPage = new URL(`/not-found`, request.nextUrl.origin);
  const path = request.nextUrl.pathname;

  const table = path.split("/")[2];
  const isWrongTable = checkValidTableValue(table);
  if (isWrongTable) return NextResponse.redirect(notFoundPage);

  const cookie = await cookies();
  const cookieTable = cookie?.get("table")?.value ?? "";
  if (table !== cookieTable) return NextResponse.redirect(notFoundPage);

  return null;
}
