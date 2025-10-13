"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";

import AppVisitorHeader from "@/feature/table/(router)/components/header";
import RequestConfirmModal from "@/feature/components/modal/confirm/request";

import CallPageMain from "./call-main";
import RoutePageFrame from "../components/frame/page/page-index";
import SubmitButton from "../../components/submit-button";

import { useEffect } from "react";
import { AnimatePresence } from "motion/react";

export default function CallPage() {
  const setFlag = useBoundStore((state) => state.setFlag);

  useEffect(() => {
    setFlag({ isClicked: false });
  }, []);

  return (
    <RoutePageFrame>
      <AppVisitorHeader title={"직원호출"} />

      <CallPageMain />

      <SubmitButtonComp />

      <RequestConfirmModal />
    </RoutePageFrame>
  );
}

function SubmitButtonComp() {
  const isClicked = useBoundStore((state) => state.callState.isClicked);

  return (
    <AnimatePresence>
      {isClicked && <SubmitButton key={"SubmitButton"} type={"request"} />}
    </AnimatePresence>
  );
}
