"use server";

import { cookies } from "next/headers";
import { createClient } from "../server";

export async function getTableSSR() {
  const cookie = await cookies();
  const table = cookie.get("table")!;

  const supabase = await createClient();
  const response = await supabase
    .from("table")
    .select("*")
    .eq("number", table.value);

  if (response.error) {
    const msg = response.error.message ?? "getTableSSR Error";
    if (process.env.NODE_ENV === "development") console.error(msg);
    throw new Error(msg);
  }

  return response.data;
}
