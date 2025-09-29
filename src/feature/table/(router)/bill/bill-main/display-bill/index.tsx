import { calculateTotalPrice } from "@/lib/function/(router)/calculateTotalPrice";

import Divider from "@/feature/table/(router)/components/line/line-index";
import MenuList from "@/feature/table/(router)/components/main/display/menu-list/list-index";
import DisplayTotalPrice from "@/feature/table/(router)/components/main/display/total-price/price-index";
import VerticalStackGroup from "@/feature/table/(router)/components/vertical-stack/stack-index";

import { OrderList } from "@/types/table";

export default function Bill({ orders }: { orders: OrderList[] }) {
  const totalPrice = orders.reduce(calculateTotalPrice, 0);
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <>
      <VerticalStackGroup tag="div" gap="gap-5">
        <MenuList orders={orders} />
      </VerticalStackGroup>

      <Divider />

      <DisplayTotalPrice title="결제금액" price={totalPriceToString} />
    </>
  );
}
