import { useBoundStore } from "@/lib/store/use-bound-store";
import { MenuCategoryList } from "@/types/table";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CategoryUnderBar({
  category,
}: {
  category: MenuCategoryList;
}) {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const currentCategoryTitle = useBoundStore(
    (state) => state.categoryState.title,
  );

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  return (
    <>
      {!isFirstLoad && currentCategoryTitle === category.title && <UnderBar />}
    </>
  );
}

function UnderBar() {
  return (
    <motion.div
      className={
        "absolute -bottom-[1px] left-[12px] h-[1px] w-[calc(100%-24px)] bg-[#222]"
      }
      layoutId="underBar"
    ></motion.div>
  );
}
