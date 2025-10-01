"use client";

import { SITE_KEY } from "@/util/const";

import { handleCaptchaLogin } from "./actions";

import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function CaptchaLoginPage() {
  const ref = useRef<TurnstileInstance | undefined>(undefined);

  const router = useRouter();

  const notify = async (token: string) => {
    const toastId = toast.loading("인증 처리 중...");

    const res = await handleCaptchaLogin(token);
    if (res.ok) {
      toast.update(toastId, {
        render: <Pass />,
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 5000,
      });

      console.log(res);

      router.push(`/table/${res.table}`);
      return;
    }

    toast.update(toastId, {
      render: <Fail message={res.message} debug={res.debug ?? ""} />,
      type: "error",
      isLoading: false,
      closeButton: true,
      autoClose: 5000,
    });

    ref.current?.reset();
    return;
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white text-gray-900">
      <h1 className="mb-2 text-2xl font-semibold">봇 인증 필요</h1>

      <p className="mb-6 text-sm text-gray-600">
        서비스 보호를 위해 인증을 진행해주세요.
      </p>

      <div className="flex min-h-30 min-w-90 items-center justify-center rounded-lg border border-gray-200 p-6 shadow-md">
        <Turnstile ref={ref} siteKey={SITE_KEY} onSuccess={notify} />
      </div>

      <ToastContainer position="top-center" transition={Slide} />
    </div>
  );
}

function Pass() {
  return <div>정상적으로 인증되었습니다.</div>;
}

function Fail({ message, debug }: { message: string; debug: string }) {
  process.env.NODE_ENV === "development" && console.error(message);
  process.env.NODE_ENV === "development" && console.error(debug);

  return (
    <div>
      서버 오류가 발생했습니다.
      <br />
      다시 시도해주세요.
    </div>
  );
}
