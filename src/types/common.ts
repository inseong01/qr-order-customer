import { Tables } from "@/lib/supabase/database.types";
import { StateCreator } from "zustand";

export type LoadingType = "link" | "";

// supabase
export type MenuList = Tables<"readable_menu">;
export type MenuCategoryList = Tables<"readable_menu_category">;
export type RequestCategoryList = Tables<"readable_request_category">;
export type OrderItem = Tables<"readable_order_item">;
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
//   ? MenuCategoryList[]
//   : RequestCategoryList[];

type Line = {
  points: number[];
};

type Bottom = {
  y: number;
  line: Line;
  priceText: {
    width: number;
  };
};

export type TableMeta = {
  x: number;
  y: number;
  rec: {
    width: number;
    height: number;
  };
  tableText: {
    width: number;
  };
  bottom: Bottom;
};

// variant
export type TagDescription = "인기" | "신규" | "품절" | "";
export type HeaderTitle = "주문" | "주문내역" | "직원호출" | "계산서";
export type IconType = "arrow-left" | "plus" | "minus";
export type OrderListComponentType =
  | "AllOforderList"
  | "currentOrderList"
  | "bill";
export type CountButtonType = "pick" | "call" | "pickUpList";
export type Status = "" | "pending" | "fulfilled" | "rejected";
export type MsgType = "error" | "empty";
export type AllMenuObj = {
  [key: string]: {
    id: string;
    name: string;
    price: number;
    amount: number;
  };
};

// zustand
export type SliceCreator<T> = StateCreator<
  T,
  [["zustand/devtools", never]],
  [],
  T
>;
export type SelectedMenu = {
  name: string;
  price: number;
  amount: number;
  id: string;
};
export type Request = {
  id: number;
  title: string;
  amount: number;
};
export type ModalType = "orderCheck" | "request" | "";

// next
export type ParamsList = { table: string };
export type Params = Promise<ParamsList>;
