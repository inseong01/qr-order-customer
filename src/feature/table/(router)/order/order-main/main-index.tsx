"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";

import CheckOrderList from "./display-order/order-index";
import ProcessResult from "./main-next/next-index";
import Divider from "../../components/line/line-index";
import VerticalStackGroup from "../../components/vertical-stack/stack-index";

import { AnimatePresence, motion } from "motion/react";

export default function OrderProcedure() {
  const isNext = useBoundStore((state) => state.submitState.isNext);

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
