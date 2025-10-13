"use server";

import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";

export async function handleCaptchaLogin(captchaToken: string) {
  try {
    // 1. 테이블 쿠키 추출
    const cookieStore = await cookies();
    const table = cookieStore.get("table")?.value;
    if (!table) {
      return {
        ok: false,
        code: "INVALID_COOKIE",
        table: undefined,
        message: "테이블 번호가 지정되지 않았습니다.\n다시 시도해주세요.",
        debug: null,
      };
    }

    const supabase = await createClient();

    // 2. 익명 로그인
    const { error } = await supabase.auth.signInAnonymously({
      options: {
        captchaToken,
        data: {
          signup_origin: "qr_order_client",
          user_role: "guest",
        },
      },
    });
    if (error) {
      process.env.NODE_ENV === "development" &&
        console.log(JSON.stringify(error, null, 2));

      return {
        ok: false,
        code: error.code,
        table,
        message: "익명 로그인에 실패했습니다.\n잠시 후 다시 시도해주세요.",
        debug: error.message,
      };
    }

    // 3. 성공
    return {
      ok: true,
      code: "SUCCESS",
      table,
      message: "로그인에 성공했습니다.",
    };
  } catch (err) {
    return {
      ok: false,
      code: "UNEXPECTED_ERROR",
      table: undefined,
      message: "처리 중 오류가 발생했습니다.",
      debug: err instanceof Error ? err.message : String(err),
    };
  }
}
