import { checkValidTableValue } from "@/lib/function/middleware/check-valid-table-value";

import { NextRequest, NextResponse, userAgent } from "next/server";

/**
 * url 임의 변경 방지 미들웨어
 *
 * 기능
 * - 모바일만 접속 허가
 * - 타 테이블 접속 시 쿠키 검증
 *
 * 쿠키 설정
 * - 테이블 접속 pathname 기반
 *
 */
export async function urlRedirect(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  const HomePage = new URL(`/`, request.nextUrl.origin);
  const notFoundPage = new URL(`/not-found`, request.nextUrl.origin);

  // 링크
  const path = request.nextUrl.pathname;

  if (path === "/") return NextResponse.next();
  if (path === "/not-found") return NextResponse.next();
  if (path === "/table") return NextResponse.redirect(HomePage);

  // 접속 장치 유형
  const { device } = userAgent(request);

  // 장치 별 페이지 접근 제한
  const isMobile = device.type === "mobile" || device.type === "tablet";
  const isRedirectCondition = !isMobile && !isDev;

  if (isRedirectCondition) {
    console.log(`Device is not modile, ${device?.type ?? typeof device.type}`);
    return NextResponse.redirect(HomePage);
  }

  // 링크 테이블 값 유형 검증
  const table = path.split("/")[2]; // path 예시: /table/1
  const isWrongTableValue = checkValidTableValue(table);

  if (isWrongTableValue) return NextResponse.redirect(HomePage);

  // 하위 페이지 접속 판별
  const isSubPage = !!path.split("/")[3];

  if (isSubPage) {
    const cookie = request.cookies.get("table");
    const cookieTable = cookie?.value;
    // 링크, 쿠키 값 검증
    if (table !== cookieTable) {
      return NextResponse.redirect(notFoundPage);
    }
  }

  return NextResponse.next();
}
