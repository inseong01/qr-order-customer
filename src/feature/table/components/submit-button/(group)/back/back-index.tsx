import { useBoundStore } from "@/lib/store/use-bound-store";
import Link from "next/link";

export function SubmitBack() {
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const setMenuCategoryId = useBoundStore(
    (state) => state.selectMenuCategoryTitle,
  );

  function onClickSubmitBack() {
    setMenuCategoryId({ id: 1 });
  }

  return (
    <Link
      href={`/table/${tableName}`}
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
