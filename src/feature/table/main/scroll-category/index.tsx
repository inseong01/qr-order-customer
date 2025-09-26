import useEnableScroll from "@/lib/hook/scroll-menu-category/use-enable-scroll";
import { menuCategoryListQueryOption } from "@/lib/function/query/query-option";
import { measureCallbackElapsed } from "@/lib/function/measure/measure-callback-elapsed";

import MenuCategory from "./category-list";

import { motion } from "motion/react";
import { ReactNode, useRef, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export default function ScrollMenuCateory() {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(
    menuCategoryListQueryOption.queryKey,
  );

  return (
    <ScrollMenuCateoryBox>
      {categoryList?.map((category, idx) => {
        return <MenuCategory key={idx} category={category} />;
      })}
    </ScrollMenuCateoryBox>
  );
}

function ScrollMenuCateoryBox({ children }: { children: ReactNode }) {
  const [scrollStart, geScrollX] = useState({ x: 0, scrollX: 0 });

  const scrollContainer = useRef<HTMLDivElement>(null);

  const { data } = useSuspenseQuery(menuCategoryListQueryOption);

  const { isScrollAble } = useEnableScroll(scrollContainer);

  function onDragStart(e: MouseEvent | DragEvent) {
    if (!scrollContainer.current) return;
    if (e) {
      geScrollX({ x: e.clientX, scrollX: scrollContainer.current.scrollLeft });

      // 사진 잔상 없애기
      const img = new Image();
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

      const event = e as DragEvent;
      event.dataTransfer?.setDragImage(img, 0, 0);
    }
  }

  function onDragMouse(e: DragEvent) {
    if (!e) return;

    const container = scrollContainer.current;
    if (!container) return;

    const lastX = e.clientX;
    const move = lastX - scrollStart.x;
    const newScrollLeft = scrollStart.scrollX - move;
    const maxScrollLeft = container.scrollWidth - container.offsetWidth;
    const scrollAmount = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));

    function scrollAnimation() {
      if (!container) return;
      container.scrollLeft = scrollAmount;
    }

    requestAnimationFrame(scrollAnimation);
  }

  function performanceOnDragStart(e: DragEvent) {
    // 성능 측정('production' 변경)
    if (process.env.NODE_ENV === "development") {
      measureCallbackElapsed(e, "throttle", scrollContainer.current);
    }
    onDragStart(e);
  }

  return (
    <>
      {data && (
        <motion.div
          ref={scrollContainer}
          className={
            "scrollbar-hidden relative flex h-10 w-full overflow-x-auto border-b-[1px] border-[#e6e6e6] bg-white px-2 pb-[1px]"
          }
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          draggable={isScrollAble}
          onDragStart={performanceOnDragStart}
          onDrag={onDragMouse}
          onDragEnd={onDragMouse}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
