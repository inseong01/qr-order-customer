"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";

import TableInitHeader from "@/feature/table/header";
import TableInitMain from "@/feature/table/main";
import SubmitButton from "@/feature/table/components/submit-button";

import { useBoundStore } from "@/lib/store/use-bound-store";
import { initTableQueryOption } from "@/lib/function/query/query-option";

export default function TableInitPage() {
  return (
    <TableInitPageBox>
      <TableInitHeader />
      <TableInitMain />
      <SubmitButtonComp />
    </TableInitPageBox>
  );
}

function TableInitPageBox({ children }: { children: ReactNode }) {
  const isClicked = useBoundStore((state) => state.flagState.isClicked);
  const modalIsOpen = useBoundStore((state) => state.modalState.isOpen);
  const tableInfo = useBoundStore((state) => state.tableState);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const setTableInfo = useBoundStore((state) => state.setTableInfo);
  const resetflagState = useBoundStore((state) => state.resetflagState);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const resetSubmitState = useBoundStore((state) => state.resetSubmitState);

  useEffect(() => {
    // 모달 초기화
    if (modalIsOpen) {
      setModalOpen({ isOpen: false });
    }

    // 링크 이동 초기화
    if (isClicked) {
      resetflagState();
    }

    if (submitStatus === "pending") return;
    resetSubmitState();
  }, []);

  const queryClient = useQueryClient();
  const tableQuery = queryClient.getQueryData(initTableQueryOption.queryKey);

  /** 초기 접속 할당 */
  useEffect(() => {
    // 테이블 - 전역 상태
    if (!tableQuery?.length) return;
    if (!Object.keys(tableInfo).length) return;
    setTableInfo({ ...tableQuery[0] });
  }, [tableQuery]);

  return (
    <div className={`relative m-auto h-auto w-full cursor-default`}>
      {children}
    </div>
  );
}

function SubmitButtonComp() {
  const orderList = useBoundStore((state) => state.orderState.list);
  const isMenuClicked = useBoundStore((state) => state.orderState.isClicked);

  const isOrderListEmpty = !!orderList.length;
  const submitType = !isOrderListEmpty || isMenuClicked ? "pick" : "check";
  const showUpButton = isOrderListEmpty || isMenuClicked;

  return (
    <AnimatePresence>
      {showUpButton && <SubmitButton key={"submitBtn"} type={submitType} />}
    </AnimatePresence>
  );
}
