import { TableList } from "@/types/common";

import Divider from "@/feature/table/(router)/components/line/line-index";
import VerticalStackGroup from "@/feature/table/(router)/components/vertical-stack/stack-index";

import Item from "../../../components/main/display/menu-list/list-item";
import DisplayTotalPrice from "../../../components/main/display/total-price/price-index";

import { ReactNode } from "react";

export default function OrderList({
  orderListArr,
}: {
  orderListArr: TableList["order"];
}) {
  return orderListArr.map((order, idx) => {
    const { menu_name, quantity, menu_price } = order;
    const priceToString = menu_price.toLocaleString();
    const totalPriceToString = (quantity * menu_price).toLocaleString();

    return (
      <VerticalStackGroup key={idx} tag="div" gap="gap-5">
        {/* 구분 */}
        <VerticalStackGroup tag="div" gap="gap-2.5">
          <p>{orderListArr.length - idx}번째 주문</p>

          <Divider />
        </VerticalStackGroup>

        {/* 해당 주문 목록 */}
        <VerticalStackGroup tag="div" gap="gap-5">
          <MenuListBox>
            <Item
              key={idx}
              name={menu_name}
              amount={quantity}
              price={priceToString}
            />
            <Divider />
            <DisplayTotalPrice title="결제금액" price={totalPriceToString} />
          </MenuListBox>
        </VerticalStackGroup>
      </VerticalStackGroup>
    );
  });
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
