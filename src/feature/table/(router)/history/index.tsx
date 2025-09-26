"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";
import AppVisitorHeader from "@/feature/table/(router)/components/header";

import OrderHistory from "./history-main";
import RoutePageFrame from "../components/frame/page/page-index";

import { useEffect } from "react";

export default function HistoryPage() {
  const setFlag = useBoundStore((state) => state.setFlag);

  useEffect(() => {
    setFlag({ isClicked: false });
  }, []);

  return (
    <RoutePageFrame>
      <AppVisitorHeader title={"주문내역"} />
      <OrderHistory />
    </RoutePageFrame>
  );
}
