import { motion } from "motion/react";

import { useBoundStore } from "@/lib/store/use-bound-store";

export default function HeaderMiddle() {
  return (
    <div className="font-bold">
      <RestaurantInfo />
      <p>주문하실 음식을 골라주세요</p>
    </div>
  );
}

function RestaurantInfo() {
  const tableName = useBoundStore((state) => state.tableState.tableName);

  return (
    <div className={"mb-1 flex gap-2"}>
      <h1 className="text-2xl">희락카츠 </h1>
      {tableName && (
        <motion.span
          className={"text-sm"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          #{tableName}
        </motion.span>
      )}
    </div>
  );
}
