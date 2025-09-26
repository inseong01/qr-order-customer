import supabase from "../supabase-config";

export default async function getRequestCategories() {
  const response = await supabase
    .from(`readable_request_category`)
    .select("*")
    .order("id", { ascending: true });

  if (response.error) {
    const msg = response.error.message ?? "GetRequestCategory Error";

    if (process.env.NODE_ENV === "development") console.error(msg);

    throw new Error(response.error.message);
  }

  return response.data;
}
