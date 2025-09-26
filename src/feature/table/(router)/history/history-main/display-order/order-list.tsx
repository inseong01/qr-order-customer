import { calculateTotalPrice } from "@/lib/function/(router)/calculateTotalPrice";

import Divider from "@/feature/table/(router)/components/line/line-index";
import MenuList from "@/feature/table/(router)/components/main/display/menu-list/list-index";
import DisplayTotalPrice from "@/feature/table/(router)/components/main/display/total-price/price-index";
import VerticalStackGroup from "@/feature/table/(router)/components/vertical-stack/stack-index";

import { OrderListType } from "@/types/common";

import { ReactNode } from "react";

export default function AllOfOrderList({
  listData,
}: {
  listData: OrderListType[];
}) {
  const totalPrice = listData.reduce(calculateTotalPrice, 0);
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <VerticalStackGroup tag="div" gap="gap-5">
      <MenuListBox>
        <MenuList listData={listData} />
        <Divider />
        <DisplayTotalPrice title="결제금액" price={totalPriceToString} />
      </MenuListBox>
    </VerticalStackGroup>
  );
}

function MenuListBox({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        "flex h-auto w-full cursor-default flex-col gap-4 rounded-sm border-[1px] border-[#c9c9c9] px-8 py-6"
      }
    >
      {children}
    </div>
  );
}
