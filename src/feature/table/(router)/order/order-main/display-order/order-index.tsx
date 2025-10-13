"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";

import Divider from "@/feature/table/(router)/components/line/line-index";
import CountButton from "@/feature/table/components/count-button/button-index";
import RowSpaceBetween from "@/feature/table/(router)/components/horizontal-stack/stack-between/between-index";
import DisplayTotalPrice from "@/feature/table/(router)/components/main/display/total-price/price-index";
import VerticalStackGroup from "@/feature/table/(router)/components/vertical-stack/stack-index";

import { SelectedMenu } from "@/types/common";

export default function CheckOrderList() {
  const currentOrderList = useBoundStore((state) => state.orderState.list);
  const removeSelectedMenu = useBoundStore((state) => state.removeSelectedMenu);
  const isOrderExist = currentOrderList.length !== 0;

  function onClickDeletePickUpList(id: string) {
    return () => {
      removeSelectedMenu({ id });
    };
  }

  return (
    <VerticalStackGroup tag="ul" gap="gap-5">
      {isOrderExist ? (
        <CartOrderList
          currentOrderList={currentOrderList}
          onClickDeleteList={onClickDeletePickUpList}
        />
      ) : (
        <EmptyListComponent />
      )}
    </VerticalStackGroup>
  );
}

function CartOrderList({
  currentOrderList,
  onClickDeleteList,
}: {
  currentOrderList: SelectedMenu[];
  onClickDeleteList: (id: string) => () => void;
}) {
  return (
    <>
      {currentOrderList.map((list, idx) => {
        const { name, price, quantity, id } = list;
        const priceToString = price.toLocaleString();

        return (
          <VerticalStackGroup key={idx} tag="li" gap="gap-5">
            <VerticalStackGroup tag="div" gap="gap-2.5">
              <DisplayTotalPrice title={name} price={priceToString} />

              <RowSpaceBetween tag="div">
                <DeleteButton onClickFn={onClickDeleteList(id)} />
                <CountButton type={"pickUpList"} quantity={quantity} id={id} />
              </RowSpaceBetween>
            </VerticalStackGroup>

            <Divider borderColor="border-[#d9d9d9]" />
          </VerticalStackGroup>
        );
      })}
    </>
  );
}

function DeleteButton({ onClickFn }: { onClickFn: () => void }) {
  return (
    <div
      className={
        "cursor-pointer rounded-sm border-[1px] border-[#c9c9c9] px-3 py-1 text-xs leading-5 text-[#959595]"
      }
      onClick={onClickFn}
    >
      빼기
    </div>
  );
}

function EmptyListComponent() {
  return <li>주문 목록이 없습니다.</li>;
}
