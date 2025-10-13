import { MenuCategoryList } from "@/types/table";

import { useBoundStore } from "@/lib/store/use-bound-store";

import CategoryUnderBar from "./category-under-bar";

import { ReactNode } from "react";

export default function MenuCategory({
  category,
}: {
  category: MenuCategoryList;
}) {
  const currentCategoryTitle = useBoundStore(
    (state) => state.categoryState.title,
  );
  const selectMenuCategory = useBoundStore((state) => state.selectMenuCategory);

  function onClickChangeMenuTitle() {
    if (currentCategoryTitle === category.title) return;
    selectMenuCategory({ title: category.title });
  }

  return (
    <MenuCategoryBox onClickChangeMenuTitle={onClickChangeMenuTitle}>
      {/* 분류 이름 */}
      <div className={`relative w-full text-center`} data-id="menuCategory">
        <span className={"text-sm"}>{category.title}</span>
      </div>

      <CategoryUnderBar category={category} />
    </MenuCategoryBox>
  );
}

function MenuCategoryBox({
  children,
  onClickChangeMenuTitle,
}: {
  children: ReactNode;
  onClickChangeMenuTitle: () => void;
}) {
  return (
    <div
      className={
        "relative flex w-1/4 max-w-[230px] min-w-[145px] cursor-pointer items-center justify-center"
      }
      onClick={onClickChangeMenuTitle}
    >
      {children}
    </div>
  );
}
