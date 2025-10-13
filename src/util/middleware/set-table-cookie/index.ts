import { checkValidTableValue } from "@/lib/function/middleware/check-valid-table-value";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * 최초 접속 테이블 번호 쿠키 저장 미들웨어
 */
export async function setTableCookie(request: NextRequest) {
  const notFoundPage = new URL(`/not-found`, request.nextUrl.origin);
  const pathname = request.nextUrl.pathname;

  const tableNum = pathname.split("/")[2];
  const isWrongTable = checkValidTableValue(tableNum);
  if (isWrongTable) return NextResponse.redirect(notFoundPage); // 재접속 요구

  try {
    const cookieStore = await cookies();
    cookieStore.set("table", tableNum, {
      httpOnly: true,
      path: "/",
    });

    console.log("Cookies initialized successfully.");
    return null; // 다음 미들웨어 이동
  } catch (error) {
    console.error("Failed to set cookies:", error);
    return NextResponse.redirect(notFoundPage); // 재접속 요구
  }
}
