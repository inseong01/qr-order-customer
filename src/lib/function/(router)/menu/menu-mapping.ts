import { SelectedMenu } from "@/types/common";

export function menuMapping(
  menuList: SelectedMenu[],
  orderId: string,
  tableNum: number,
) {
  return menuList.map((m) => ({
    created_at: new Date().toISOString(),
    id: orderId,
    menu_id: m.id,
    menu_name: m.name,
    menu_price: m.price,
    quantity: m.quantity,
    table_number: tableNum,
  }));
}
