import { OrderListType } from "@/types/common";
import VerticalStackGroup from "../../../vertical-stack/stack-index";
import Item from "./list-item";

export default function MenuList({ listData }: { listData: OrderListType[] }) {
  return (
    <VerticalStackGroup tag="ul" gap="gap-5">
      {listData.map((menu, idx) => {
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
