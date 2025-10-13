"use client";

import { MenuCount, PickMenu } from "./(group)/pick/pick-index";
import { CheckMenu } from "./(group)/check/check-index";
import {
  PickAndCountButton,
  SubmitRequest,
} from "./(group)/request/request-index";
import { SubmitOrder, TotalPrice } from "./(group)/order/order-index";
import { SubmitBack } from "./(group)/back/back-index";

import { ReactNode } from "react";
import { motion } from "motion/react";

type SubmitBtn = "back" | "order" | "request" | "pick" | "check";

export default function SubmitButton({ type }: { type: SubmitBtn }) {
  switch (type) {
    case "back": {
      return (
        <SubmitButtonBox initAnimation={false}>
          <BottomComp node={<SubmitBack />} />
        </SubmitButtonBox>
      );
    }
    case "order": {
      return (
        <SubmitButtonBox initAnimation={true}>
          <TopComp node={<TotalPrice />} />
          <BottomComp node={<SubmitOrder />} />
        </SubmitButtonBox>
      );
    }
    case "request": {
      return (
        <SubmitButtonBox initAnimation={true}>
          <TopComp node={<PickAndCountButton />} />
          <BottomComp node={<SubmitRequest />} />
        </SubmitButtonBox>
      );
    }
    case "pick": {
      return (
        <SubmitButtonBox initAnimation={true}>
          <TopComp node={<MenuCount />} />
          <BottomComp node={<PickMenu />} />
        </SubmitButtonBox>
      );
    }
    case "check": {
      return (
        <SubmitButtonBox initAnimation={true}>
          <BottomComp node={<CheckMenu />} />
        </SubmitButtonBox>
      );
    }
  }
}

function SubmitButtonBox({
  initAnimation,
  children,
}: {
  children: ReactNode;
  initAnimation: boolean;
}) {
  return (
    <motion.div
      className={"fixed bottom-0 left-0 h-auto w-full cursor-default"}
      initial={initAnimation ? { y: "100%" } : false}
      animate={{ y: 0 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ bounce: 0, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// 컴포넌트 위치 별 분류
function TopComp({ node }: { node: ReactNode }) {
  return (
    <div
      className={"relative w-full border-t-[1px] border-[#e6e6e6] bg-white p-4"}
    >
      {node}
    </div>
  );
}

function BottomComp({ node }: { node: ReactNode }) {
  return (
    <nav
      className={
        "flex w-full items-center justify-center bg-[#4caff8] font-bold text-white"
      }
    >
      {node}
    </nav>
  );
}
