import { OrderList } from "@/types/table";

import Item from "./list-item";
import VerticalStackGroup from "../../../vertical-stack/stack-index";

export default function MenuList({ orders }: { orders: OrderList[] }) {
  return (
    <VerticalStackGroup tag="ul" gap="gap-5">
      {orders.map((menu, idx) => {
        const { menu_name, quantity, menu_price } = menu;
        const priceToString = menu_price.toLocaleString();

        return (
          <Item
            key={idx}
            name={menu_name}
            amount={quantity}
            price={priceToString}
          />
        );
      })}
    </VerticalStackGroup>
  );
}
