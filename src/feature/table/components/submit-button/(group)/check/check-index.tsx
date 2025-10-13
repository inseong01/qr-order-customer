import { useBoundStore } from "@/lib/store/use-bound-store";

import { useRouter } from "next/navigation";

// Bottom
export function CheckMenu() {
  const isClicked = useBoundStore((state) => state.flagState.isClicked);
  const setFlag = useBoundStore((state) => state.setFlag);
  const number = useBoundStore((state) => state.tableState.number);

  const router = useRouter();

  function onClickCheckPickUpList() {
    if (isClicked) return;

    setFlag({ isClicked: true });

    router.push(`${number}/order`);
  }

  return (
    <button
      className={
        "flex h-1/2 w-full cursor-pointer items-center justify-center bg-[#4caff8] p-4 font-semibold text-white"
      }
      onClick={onClickCheckPickUpList}
    >
      <span>주문표 확인하기</span>
    </button>
  );
}
