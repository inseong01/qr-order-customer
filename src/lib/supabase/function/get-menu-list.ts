import supabase from "../supabase-config";

export default async function getMenuList() {
  const { data, error } = await supabase.from("readable_menu").select(`*`);

  if (error) {
    const msg = error.message ?? "GetMenuList Error";

    if (process.env.NODE_ENV === "development") console.error(msg);

    throw new Error(error.message);
  }

  return data;
}
