import { createClient } from "../client";

export async function getRequestCategories() {
  const supabase = createClient();
  const response = await supabase.from(`readable_request_category`).select("*");

  if (response.error) {
    const msg = response.error.message ?? "GetRequestCategory Error";

    if (process.env.NODE_ENV === "development") console.error(msg);

    throw new Error(response.error.message);
  }

  return response.data;
}
