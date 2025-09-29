import { Turnstile } from "@marsidev/react-turnstile";

export default function LoginPage() {
  return (
    <>
      <h1>로그인 페이지</h1>

      <Turnstile siteKey="1x00000000000000000000AA" />

      {/* TODO: data 받고 Supabase auth anon login 구현  */}
    </>
  );
}
