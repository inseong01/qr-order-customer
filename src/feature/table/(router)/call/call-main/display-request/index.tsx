import { request_parents } from "@/lib/motion/display-request/request-variants";
import { useBoundStore } from "@/lib/store/use-bound-store";
import { RequestCategoryList } from "@/types/common";
import Request from "./request-item";

import { motion } from "motion/react";

export default function RequestList({ data }: { data: RequestCategoryList[] }) {
  const selectedArr = useBoundStore(
    (state) => state.callState.selectedRequests,
  );

  return (
    <motion.div
      className={"flex flex-wrap gap-2.5"}
      initial={"hidden"}
      animate={"visible"}
      variants={request_parents}
    >
      {data.map((req, idx) => {
        const isIncludedItem = selectedArr.some((item) => item.id === req.id);

        return <Request key={idx} req={req} isIncludedItem={isIncludedItem} />;
      })}
    </motion.div>
  );
}
