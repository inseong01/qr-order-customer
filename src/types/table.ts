import { Tables } from "@/lib/supabase/database.types";

// supabase
export type MenuList = Tables<"readable_menu">;
export type MenuCategoryList = Tables<"readable_menu_category">;
export type RequestCategoryList = Tables<"readable_request_category">;
export type OrderList = Tables<"readable_order_item">;
// export type InsertOrderList = TablesInsert<"qr-order-allOrderList">;
// export type InsertRequestList = TablesInsert<"qr-order-request-list">;

// supabase variant
// export type CategoryType = "menu" | "request";
// export type TableOrderType = {
//   id: string;
//   orderList: OrderListType[];
//   created_at: Date;
// };
// export type OrderListType = {
//   id: string;
//   name: string;
//   price: number;
//   amount: number;
// };
// export type CategoryList<T> = T extends "menu"
//   ? import { MenuCategoryList } from "@/types/table";[]
//   : RequestCategoryList[];
