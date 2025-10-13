"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";

import { HeaderTitle } from "./types";
import SimpleIcon from "../../../components/simple-icon/icon-index";

import { useRouter } from "next/navigation";
import { memo } from "react";

function AppVisitorHeader({ title }: { title: HeaderTitle }) {
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const number = useBoundStore((state) => state.tableState.number);
  const selectMenuCategory = useBoundStore((state) => state.selectMenuCategory);

  const router = useRouter();

  function navOnClickBack() {
    if (isSubmit) return;
    if (submitStatus === "fulfilled") {
      // 주문 페이지 돌아오기 방지
      router.replace(`/table/${number}`);
      return;
    }

    selectMenuCategory({ title: "전체메뉴" });

    router.back();
  }

  return (
    <header
      className={"relative z-9 h-auto w-full cursor-default bg-[#f4f4f4]"}
    >
      <div className={"relative flex h-full w-full items-center p-4"}>
        <nav
          onClick={navOnClickBack}
          className={"h-4 w-4 cursor-pointer text-sm"}
        >
          <SimpleIcon type={"arrow-left"} />
        </nav>
        <span className={"absolute top-1/2 left-1/2 -translate-1/2 leading-5"}>
          {title}
        </span>
      </div>
    </header>
  );
}

export default memo(AppVisitorHeader);
