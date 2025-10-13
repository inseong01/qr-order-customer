"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";

import OrderConfirmModal from "@/feature/components/modal/confirm/order";
import AppVisitorHeader from "@/feature/table/(router)/components/header";

import OrderProcedure from "./order-main/main-index";
import RoutePageFrame from "../components/frame/page/page-index";
import SubmitButton from "../../components/submit-button";

import { useEffect } from "react";

export default function OrderPage() {
  const setFlag = useBoundStore((state) => state.setFlag);

  useEffect(() => {
    setFlag({ isClicked: false });
  }, []);

  return (
    <RoutePageFrame>
      <AppVisitorHeader title={"주문"} />

      <OrderProcedure />

      <SubmitButtonComp />

      <OrderConfirmModal />
    </RoutePageFrame>
  );
}

function SubmitButtonComp() {
  const currentOrderList = useBoundStore((state) => state.orderState.list);
  const isNext = useBoundStore((state) => state.submitState.isNext);

  if (isNext) return <SubmitButton type="back" />;

  if (currentOrderList.length !== 0) return <SubmitButton type="order" />;

  return <SubmitButton type={"back"} />;
}
