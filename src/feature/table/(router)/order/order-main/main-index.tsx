"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";
import { orderListQueryOption } from "@/lib/function/query/query-option";
import CheckOrderList from "./display-order/order-index";
import ProcessResult from "./main-next/next-index";
import Divider from "../../components/line/line-index";
import VerticalStackGroup from "../../components/vertical-stack/stack-index";

import { AnimatePresence, motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function OrderProcedure() {
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const isNext = useBoundStore((state) => state.submitState.isNext);
  const setNexPageEnable = useBoundStore((state) => state.setNexPageEnable);

  const { refetch } = useQuery(orderListQueryOption(tableName));

  // 주문 완료 시 주문 데이터 추출
  useEffect(() => {
    // 중복 refetch 제한
    if (isNext) return;

    // submitStatus 상황 처리
    if (!submitStatus) return;
    if (submitStatus === "pending") return;
    if (submitStatus === "fulfilled") {
      refetch();
    }

    // 주문 처리 결과 화면전환 지연시간 부여
    const timer = setTimeout(() => {
      setNexPageEnable({ isNext: true });
    }, 400);

    return () => clearTimeout(timer);
  }, [submitStatus]);

  return (
    <AnimatePresence mode="popLayout">
      {!isNext ? (
        // AnimatePresence가 이전 컴포넌트를 인식하지 못해 로컬화 하지 않음
        <motion.main
          className={"flex h-full w-full flex-col gap-5 p-4"}
          key={"NotCompletedOrder"}
          initial={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <VerticalStackGroup tag="div" gap="gap-2.5">
            <p>주문표 목록</p>
            <Divider />
          </VerticalStackGroup>
          <CheckOrderList />
        </motion.main>
      ) : (
        <ProcessResult />
      )}
    </AnimatePresence>
  );
}
