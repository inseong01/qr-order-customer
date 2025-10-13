import { NextRequest, NextResponse, userAgent } from "next/server";

/**
 * 접속 기기 검증 미들웨어
 */
export function validateDevice(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  const HomePage = new URL(`/`, request.nextUrl.origin);

  const { device } = userAgent(request);
  const isMobile = device.type === "mobile" || device.type === "tablet";
  const isRedirectCondition = !isMobile && !isDev;

  if (isRedirectCondition) {
    console.log(`Device is not mobile, ${device?.type ?? typeof device.type}`);
    return NextResponse.redirect(HomePage);
  }

  return null;
}
