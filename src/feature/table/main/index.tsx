import ScrollMenuCateory from "./scroll-category";
import MenuDisplay from "./display-menu";

import { memo } from "react";

function TableInitMain() {
  return (
    <main className={"relative h-full w-full bg-white"}>
      {/* 카테고리 목록 */}
      <ScrollMenuCateory />

      {/* 메뉴 목록 */}
      <MenuDisplay />
    </main>
  );
}

export default memo(TableInitMain);
