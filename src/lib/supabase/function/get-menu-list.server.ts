import { createClient } from "../server";

export async function getMenuListSSR() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("readable_menu").select(`*`);

  if (error) {
    const msg = error.message ?? "GetMenuList Error";

    if (process.env.NODE_ENV === "development") console.error(msg);

    throw new Error(error.message);
  }

  return data;
}
