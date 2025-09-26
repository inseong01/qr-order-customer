import { useBoundStore } from "@/lib/store/use-bound-store";
import PlusMinusIcon from "@/feature/table/components/simple-icon/icon-index";
import { MenuList } from "@/types/common";

import { AnimatePresence, motion } from "motion/react";
import { MouseEvent, useState } from "react";

export default function MenuAddIcon({ list }: { list: MenuList }) {
  const currentOrderList = useBoundStore((state) => state.orderState.list);
  const selectMenuInstantly = useBoundStore(
    (state) => state.selectMenuInstantly,
  );
  const removeSelectedMenu = useBoundStore((state) => state.removeSelectedMenu);
  const [isIconClicked, setIsIconClicked] = useState(false);
  const isPickedItem = currentOrderList.some((order) => order.id === list.id);

  function onClickIcon(list: MenuList, isPickedItem: boolean) {
    return (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const { tag } = list;

      if (tag === "soldout" || isIconClicked) return;

      switch (isPickedItem) {
        case true: {
          onClickMinusIcon(list);
          return;
        }
        case false: {
          onClickPlusIcon(list);
          return;
        }
      }
    };
  }

  function onClickPlusIcon({ name, price, id, tag }: MenuList) {
    if (tag === "soldout") return;

    const menu = { name, price, amount: 1, id };

    selectMenuInstantly(menu);
  }

  function onClickMinusIcon({ id, tag }: MenuList) {
    if (tag === "soldout") return;

    removeSelectedMenu({ id });
  }

  return (
    <div className={"flex w-full justify-end"}>
      <div
        className={"relative h-5 w-5"}
        onClick={onClickIcon(list, isPickedItem)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {!isPickedItem ? (
            list.tag === "soldout" ? (
              <div
                className={`h-full w-full rounded-full border-[1px] border-[#222] bg-white opacity-30`}
              >
                <PlusMinusIcon type={"plus"} />
              </div>
            ) : (
              <motion.div
                className={
                  "h-full w-full rounded-full border-[1px] border-[#222] bg-white"
                }
                key={"plus"}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                exit={{ rotateY: 360 }}
                transition={{ duration: 0.3 }}
                onAnimationStart={() => setIsIconClicked(true)}
                onAnimationComplete={() => setIsIconClicked(false)}
              >
                <PlusMinusIcon type={"plus"} />
              </motion.div>
            )
          ) : (
            <motion.div
              className={
                "h-full w-full rounded-full border-[1px] border-[#222] bg-white"
              }
              key={"minus"}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 180 }}
              exit={{ rotateY: 360 }}
              transition={{ duration: 0.3 }}
              onAnimationStart={() => setIsIconClicked(true)}
              onAnimationComplete={() => setIsIconClicked(false)}
            >
              <PlusMinusIcon type={"minus"} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
