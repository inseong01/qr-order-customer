import { motion } from "motion/react";
import { memo, ReactNode } from "react";

import { useBoundStore } from "@/lib/store/use-bound-store";
import { request_child } from "@/lib/motion/display-request/request-variants";
import { RequestCategoryList } from "@/types/common";

function Request({
  req,
  isIncludedItem,
}: {
  req: RequestCategoryList;
  isIncludedItem: boolean;
}) {
  const { title } = req;
  return (
    <RequestBox req={req} isIncludedItem={isIncludedItem}>
      <p>{title}</p>
    </RequestBox>
  );
}

export default memo(Request);

function RequestBox({
  req,
  isIncludedItem,
  children,
}: {
  req: RequestCategoryList;
  isIncludedItem: boolean;
  children: ReactNode;
}) {
  const selectRequest = useBoundStore((state) => state.selectRequest);

  function onClickSelect({
    id,
    title,
  }: {
    id: RequestCategoryList["id"];
    title: RequestCategoryList["title"];
  }) {
    return () => {
      selectRequest({ id, title, amount: 1 });
    };
  }

  return (
    <motion.div
      className={`flex h-15 min-w-[140px] flex-1 cursor-pointer items-center justify-center rounded border-[1px] border-[#e6e6e6] ${isIncludedItem ? "bg-[#4caff8]! text-white!" : ""}`}
      onClick={onClickSelect(req)}
      variants={request_child}
      whileTap={{
        scale: 0.85,
        backgroundColor: "#4caff8",
        color: "rgb(255, 255, 255)",
        transition: { duration: 0.7 },
      }}
    >
      {children}
    </motion.div>
  );
}
