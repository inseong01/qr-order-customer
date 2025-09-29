import { supabase } from "../client";

export default async function getMenuCategories() {
  const response = await supabase
    .from(`readable_menu_category`)
    .select("*")
    .order("id", { ascending: true });

  if (response.error) {
    const msg = response.error.message ?? "GetMenuCategories Error";

    if (process.env.NODE_ENV === "development") console.error(msg);

    throw new Error(response.error.message);
  }

  return response.data;
}
