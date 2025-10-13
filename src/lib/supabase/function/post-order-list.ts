import { SelectedMenu } from "@/types/common";

import { createClient } from "../client";
import { Database } from "../database.types";

type OrderInsertTable = Database["public"]["Tables"]["order"]["Insert"];
type OrderItemInsertTable =
  Database["public"]["Tables"]["order_item"]["Insert"];

type OrderData = Required<Pick<OrderInsertTable, "id" | "table_id">>;
type OrderItemData = Required<
  Pick<OrderItemInsertTable, "menu_id" | "order_id" | "quantity">
>;

export type OrderProps = {
  id: string;
  table_id: string;
  menu: Required<Pick<SelectedMenu, "id" | "quantity">>[];
};

export default async function postOrderList(order: OrderProps) {
  // if (process.env.NODE_ENV === "development") {
  //   // return new Promise<
  //   //   {
  //   //     id: string;
  //   //     menu_id: string;
  //   //     order_id: string;
  //   //     quantity: number;
  //   //   }[]
  //   // >((res) => setTimeout(() => res([]), 1500));
  //   return new Promise<
  //     {
  //       id: string;
  //       menu_id: string;
  //       order_id: string;
  //       quantity: number;
  //     }[]
  //   >((_, rej) => setTimeout(() => rej([]), 500));
  // }

  // order
  const orderData: OrderData = { id: order.id, table_id: order.table_id };
  const orderRes = await createClient()
    .from("order")
    .insert(orderData)
    .select();

  if (orderRes.error) {
    const msg =
      orderRes.error.message ?? "주문이 정상적으로 처리되지 않았습니다.";
    throw new Error(msg);
  }

  // order_item
  const orderItemData: OrderItemData[] = order.menu.map((m) => ({
    menu_id: m.id,
    quantity: m.quantity,
    order_id: order.id,
  }));
  const orderItemRes = await createClient()
    .from("order_item")
    .insert(orderItemData)
    .select();

  if (orderItemRes.error) {
    const msg =
      orderItemRes.error.message ?? "주문이 정상적으로 처리되지 않았습니다.";
    throw new Error(msg);
  }

  return orderItemRes;
}
