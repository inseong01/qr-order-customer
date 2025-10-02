import { createClient } from "../server";

export async function getTableOrderListSSR(tableNum: number) {
  const supabase = await createClient();
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
