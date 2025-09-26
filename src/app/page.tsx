import Link from "next/link";

import LogoImage from "@/feature/components/logo/logo-index";

export default function Home() {
  return (
    <main
      className={"h-full w-full cursor-default bg-[#fafdff] text-[#3273b5]"}
    >
      <div
        className={
          "m-auto flex h-full w-full max-w-[450px] flex-col justify-between p-6 text-left"
        }
      >
        <div className={`flex h-[90%] flex-col justify-center gap-12`}>
          {/* 상단 */}
          <div className={"flex flex-col gap-3"}>
            <h1 className="font-bold">반갑습니다 &#x003A;&#x0029;</h1>
            <div className={"w-full text-2xl leading-8 font-bold break-keep"}>
              <p>주문의 간편함,</p>
              <p>QR-ORDER 입니다.</p>
            </div>
            <div className={"text-xs text-[#5486b7]"}>
              <p>QR코드를 다시 스캔해주세요.</p>
              <br />
              <p>
                주문 서비스를 이용할 경우, <br /> 모바일 또는 태블릿으로
                접속해주세요.
              </p>
            </div>
          </div>

          {/* 하단 */}
          <div className={"text-xs"}>
            <p className="font-bold">저장소 살펴보기</p>

            <div className="flex gap-3">
              <Link
                href={"https://github.com/inseong01/QR-order-admin"}
                className={
                  "inline-block border-b-[1px] py-1 pb-0 text-[#5486b7]"
                }
                target="_blank"
              >
                관리자
              </Link>

              <Link
                href={"https://github.com/inseong01/QR-order-customer"}
                className={
                  "inline-block border-b-[1px] py-1 pb-0 text-[#5486b7]"
                }
                target="_blank"
              >
                고객
              </Link>
            </div>
          </div>
        </div>

        {/* 하단 로고 */}
        <div className={`flex h-[10%] flex-col items-end justify-end`}>
          <LogoImage />
        </div>
      </div>
    </main>
  );
}
