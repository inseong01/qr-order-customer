import { createClient } from "../client";

export async function getMenuCategoryList() {
  const supabase = createClient();
  const response = await supabase.from(`readable_menu_category`).select("*");

  if (response.error) {
    const msg = response.error.message ?? "getMenuCategoryList Error";

    if (process.env.NODE_ENV === "development") console.error(msg);

    throw new Error(response.error.message);
  }

  return response.data;
}
