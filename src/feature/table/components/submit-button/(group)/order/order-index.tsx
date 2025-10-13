import { useBoundStore } from "@/lib/store/use-bound-store";
import DisplayTotalPrice from "@/feature/table/(router)/components/main/display/total-price/price-index";

import { useEffect, useState } from "react";

// Top
export function TotalPrice() {
  const orderList = useBoundStore((state) => state.orderState.list);

  const totalPrice = orderList.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0,
  );
  const totalPriceToString = totalPrice.toLocaleString();

  return <DisplayTotalPrice title="합계" price={totalPriceToString} />;
}

// Bottom
export function SubmitOrder() {
  const setModalOpen = useBoundStore((state) => state.setModalOpen);

  const [enable, setClickEnable] = useState(false);

  // 클릭 지연, orderListQueryOption 에러 확인 목적
  useEffect(() => {
    const timer = setTimeout(() => {
      setClickEnable(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  function onClickSubmitOrderList() {
    if (!enable) return;

    setModalOpen({ isOpen: true });
  }

  return (
    <button
      className={`flex h-full w-full cursor-pointer items-center justify-center p-4`}
      disabled={!enable}
      onClick={onClickSubmitOrderList}
    >
      주문하기
    </button>
  );
}
