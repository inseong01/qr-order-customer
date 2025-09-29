import { supabase } from "../client";

export default async function getTableOrderList(tableNum: number) {
  const response = await supabase
    .from("readable_order_item")
    .select("*")
    .eq("table_number", tableNum)
    .order("created_at", { ascending: false });

  if (response.error) {
    const msg = response.error.message ?? "GetTableOrderList Error";

    if (process.env.NODE_ENV === "development") console.error(msg);

    throw new Error(msg);
  }
  return response.data;
}
