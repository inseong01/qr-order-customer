"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";
import { orderListQueryOption } from "@/lib/function/query/query-option";
import ProcessedOrderList from "./display-order/order-index";
import VerticalStackGroup from "@/feature/table/(router)/components/vertical-stack/stack-index";

import { motion } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

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
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const submitStatus = useBoundStore((state) => state.submitState.status);

  const query = useQueryClient();
  const queryState = query.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );

  const isOk = submitStatus === "fulfilled" && queryState?.status === "success";
  const status = isOk ? "ok" : "fail";
  const result = isOk ? "완료" : "실패";
  const description = isOk
    ? "정상적으로 접수되었어요, 조금만 기다려주세요!"
    : "정상적으로 접수되지 않았어요, 직원을 호출해주세요!";

  return (
    <div
      className={
        "flex w-full flex-col items-center justify-center gap-2.5 p-10"
      }
    >
      <h1 className="text-3xl font-bold">
        주문이 <span data-tag={status}>{result}</span>되었어요
      </h1>
      <p className={"text-xs text-[#959595]"}>{description}</p>
    </div>
  );
}

function ProcessedtOrder() {
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const submitStatus = useBoundStore((state) => state.submitState.status);

  const queryClient = useQueryClient();
  const orderList = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );

  const isOk = submitStatus === "fulfilled" && orderList?.status === "success";

  return (
    <VerticalStackGroup tag="div" gap="gap-5">
      <MenuListBox>
        {isOk ? (
          <ProcessedOrderList queryData={orderList.data} />
        ) : (
          <EmptyListComponent />
        )}
      </MenuListBox>
      <BillInfo tableName={tableName} />
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

function BillInfo({ tableName }: { tableName: string }) {
  return (
    <div className={"flex flex-col gap-1 text-center text-xs text-[#959595]"}>
      <span>결제는 후불입니다.</span>
      <span>현재 앉아 계신 테이블 번호는 {tableName}번 입니다.</span>
    </div>
  );
}

function EmptyListComponent() {
  return <div className={"text-[#959595]"}>접수된 주문이 없습니다.</div>;
}
