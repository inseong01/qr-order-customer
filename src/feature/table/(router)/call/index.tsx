"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";

import AppVisitorHeader from "@/feature/table/(router)/components/header";
import AlertModal from "@/feature/components/modal/alert-modal/modal-index";

import CallPageMain from "./call-main";
import RoutePageFrame from "../components/frame/page/page-index";
import SubmitButton from "../../components/submit-button";

import { useEffect } from "react";
import { AnimatePresence } from "motion/react";

export default function CallPage() {
  const resetCallState = useBoundStore((state) => state.resetCallState);
  const setModalType = useBoundStore((state) => state.setModalType);
  const setFlag = useBoundStore((state) => state.setFlag);

  useEffect(() => {
    resetCallState();
    setModalType({ type: "request" });
    setFlag({ isClicked: false });
  }, []);

  return (
    <RoutePageFrame>
      <AppVisitorHeader title={"직원호출"} />
      <CallPageMain />
      <SubmitButtonComp />
      <AlertModal />
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
