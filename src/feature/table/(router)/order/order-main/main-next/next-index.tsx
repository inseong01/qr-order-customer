"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";

import VerticalStackGroup from "@/feature/table/(router)/components/vertical-stack/stack-index";

import ProcessedOrderList from "./display-order/order-index";

import { ReactNode } from "react";
import { motion } from "motion/react";

export default function ProcessResult() {
  return (
    <motion.main
      className={"flex h-full w-full flex-col gap-5 p-4"}
      key={"CompletedOrder"}
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <OrderProcessResult />
      <ProcessedtOrder />
    </motion.main>
  );
}

function OrderProcessResult() {
  const isSuccess = useBoundStore((state) => state.submitState.isSuccess);

  const status = isSuccess ? "ok" : "fail";
  const result = isSuccess ? "완료" : "실패";
  const description = isSuccess
    ? "정상적으로 접수되었어요, 조금만 기다려주세요!"
    : "정상적으로 접수되지 않았어요, 직원을 호출해주세요!";

  return (
    <div
      className={
        "flex w-full flex-col items-center justify-center gap-2.5 p-10"
      }
    >
      <h1 className="text-3xl font-bold">
        주문이 <span data-tag={status}>{result}</span>되었어요.
      </h1>

      <p className="text-xs text-[#959595]">{description}</p>
    </div>
  );
}

function ProcessedtOrder() {
  const number = useBoundStore((state) => state.tableState.number);
  const isSuccess = useBoundStore((state) => state.submitState.isSuccess);

  return (
    <VerticalStackGroup tag="div" gap="gap-5">
      <MenuListBox>
        {isSuccess ? <ProcessedOrderList /> : <EmptyListComponent />}
      </MenuListBox>

      <div className={"flex flex-col gap-1 text-center text-xs text-[#959595]"}>
        <span>결제는 후불입니다.</span>
        <span>현재 앉아 계신 테이블 번호는 {number}번 입니다.</span>
      </div>
    </VerticalStackGroup>
  );
}

function MenuListBox({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        "flex h-auto w-full cursor-default flex-col gap-4 rounded-sm border-[1px] border-[#c9c9c9] px-8 py-6"
      }
    >
      {children}
    </div>
  );
}

export function EmptyListComponent() {
  return <div className={"text-[#959595]"}>접수된 주문이 없습니다.</div>;
}
