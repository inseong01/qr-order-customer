"use client";

import { ReactNode, useEffect } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence } from "motion/react";

import TableInitHeader from "@/feature/table/header";
import TableInitMain from "@/feature/table/main";
import SubmitButton from "@/feature/table/components/submit-button";

import { useBoundStore } from "@/lib/store/use-bound-store";

import { ParamsList } from "./(router)/order/types";

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
  const params = useParams<ParamsList>();

  const isClicked = useBoundStore((state) => state.flagState.isClicked);
  const modalIsOpen = useBoundStore((state) => state.modalState.isOpen);
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const submitStatus = useBoundStore((state) => state.submitState.status);
  const fetchMode = useBoundStore((state) => state.submitState.fetchMode);
  const setTableName = useBoundStore((state) => state.setTableName);
  const resetflagState = useBoundStore((state) => state.resetflagState);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const resetSubmitState = useBoundStore((state) => state.resetSubmitState);
  const resetPickUpState = useBoundStore((state) => state.resetOrderState);

  useEffect(() => {
    // 초기 접속 할당
    if (!tableName) {
      // 테이블 - 전역 상태
      setTableName(params);
    }

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

    if (fetchMode === "order") {
      resetPickUpState();
    }
  }, []);

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
