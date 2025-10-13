import { useBoundStore } from "@/lib/store/use-bound-store";
import Link from "next/link";

export function SubmitBack() {
  const number = useBoundStore((state) => state.tableState.number);
  const setMenuCategory = useBoundStore((state) => state.selectMenuCategory);
  const resetOrderState = useBoundStore((state) => state.resetOrderState);

  function onClickSubmitBack() {
    setMenuCategory({ title: "전체메뉴" });
    resetOrderState();
  }

  return (
    <Link
      href={`/table/${number}`}
      replace={true}
      className="flex h-full w-full"
    >
      <button
        onClick={onClickSubmitBack}
        className="flex h-full w-full cursor-pointer items-center justify-center p-4"
      >
        돌아가기
      </button>
    </Link>
  );
}
