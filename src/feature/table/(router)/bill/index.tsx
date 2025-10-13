"use client";

import AppVisitorHeader from "@/feature/table/(router)/components/header";
import { useBoundStore } from "@/lib/store/use-bound-store";

import BillPageMain from "./bill-main";
import RoutePageFrame from "../components/frame/page/page-index";

import { useEffect } from "react";

export default function BillPage() {
  const setFlag = useBoundStore((state) => state.setFlag);

  useEffect(() => {
    setFlag({ isClicked: false });
  }, []);

  return (
    <RoutePageFrame>
      <AppVisitorHeader title={"계산서"} />
      <BillPageMain />
    </RoutePageFrame>
  );
}
