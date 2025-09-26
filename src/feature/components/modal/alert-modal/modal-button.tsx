import { orderListQueryOption } from "@/lib/function/query/query-option";
import { useBoundStore } from "@/lib/store/use-bound-store";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export function ConfirmButton() {
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const setMenuCategoryId = useBoundStore(
    (state) => state.selectMenuCategoryTitle,
  );

  function onClickContinue() {
    if (isSubmit) return;

    setMenuCategoryId({ id: 1 });
  }

  return (
    <Link
      href={`/table/${tableName}`}
      replace={true}
      className={"flex h-2/5 w-full border-t-[1px] border-[#e6e6e6]"}
    >
      <Button title="확인" onClick={onClickContinue} />
    </Link>
  );
}

export function YesNoButtons() {
  const tableName = useBoundStore((state) => state.tableState.tableName);
  const orderList = useBoundStore((state) => state.orderState.list);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const fetchOrderArr = useBoundStore((state) => state.fetchOrderArr);

  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );

  // db 제출 허용, '예'
  function onClickPermission() {
    if (isSubmit) return;

    // 주문 전달
    fetchOrderArr({
      orderList,
      submitError: queryState?.status === "error",
    });

    // 모달 닫기
    setModalOpen({ isOpen: false });
  }

  // db 제출 거부, '아니요'
  function onClickRejection() {
    setModalOpen({ isOpen: false });
  }

  return (
    <nav className="flex h-2/5 w-full divide-x-[1px] divide-[#e6e6e6] border-t-[1px] border-[#e6e6e6]">
      <Button title="아니요" onClick={onClickRejection} />
      <Button title="예" onClick={onClickPermission} />
    </nav>
  );
}

function Button({ onClick, title }: { onClick?: () => void; title: string }) {
  return (
    <button
      className={`flex h-full w-1/2 flex-1 cursor-pointer items-center justify-center text-xs text-[#808080]`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
