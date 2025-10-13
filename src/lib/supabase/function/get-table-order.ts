import { createClient } from "../client";

import mockOrderList from "@/mock/order-list.json";

export async function getTableOrderList(tableNum: number) {
  // if (process.env.NODE_ENV === "development") {
  //   return new Promise<
  //     {
  //       created_at: string;
  //       id: string;
  //       menu_id: string;
  //       menu_name: string;
  //       menu_price: number;
  //       quantity: number;
  //       table_number: number;
  //     }[]
  //   >((res) => setTimeout(() => res(mockOrderList), 1500));
  //   // return new Promise<
  //   //   {
  //   //     created_at: string;
  //   //     id: string;
  //   //     menu_id: string;
  //   //     menu_name: string;
  //   //     menu_price: number;
  //   //     quantity: number;
  //   //     table_number: number;
  //   //   }[]
  //   // >((_, rej) => setTimeout(() => rej([]), 500));
  // }

  const supabase = createClient();
  const response = await supabase
    .from("readable_order_item")
    .select("*")
    .eq("table_number", tableNum)
    .order("created_at", { ascending: false });

  if (response.error) {
    const msg = response.error.message ?? "GetTableOrderList Error";
    throw new Error(msg);
  }

  return response.data;
}
