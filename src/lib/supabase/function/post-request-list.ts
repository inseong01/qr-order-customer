import { Request } from "@/types/common";

import { createClient } from "../client";
import { Database } from "../database.types";

type RequestInsertTable = Database["public"]["Tables"]["request"]["Insert"];
type RequestItemInsertTable =
  Database["public"]["Tables"]["request_item"]["Insert"];

type RequestData = Required<Pick<RequestInsertTable, "id" | "table_id">>;
type RequestItemData = Required<
  Pick<RequestItemInsertTable, "request_id" | "category_id" | "quantity">
>;

export type RequestProps = {
  id: string;
  tableId?: string;
  list: Request[];
};

export default async function postRequestList(request: RequestProps) {
  // if (process.env.NODE_ENV === "development") {
  //   // return new Promise((res) => setTimeout(() => res("success"), 500));
  //   return new Promise((_, rej) => setTimeout(() => rej("fail"), 500));
  // }

  if (!request.tableId) throw new Error("테이블 정보가 반영되지 않았습니다.");

  // request
  const requestData: RequestData = {
    id: request.id,
    table_id: request.tableId,
  };
  const orderRes = await createClient()
    .from("request")
    .insert(requestData)
    .select();

  if (orderRes.error) {
    const msg =
      orderRes.error.message ?? "요청이 정상적으로 처리되지 않았습니다.";
    throw new Error(msg);
  }

  // request_item
  const requestItemData: RequestItemData[] = request.list.map((r) => ({
    request_id: request.id,
    category_id: r.id,
    quantity: r.quantity,
  }));
  const orderItemRes = await createClient()
    .from("request_item")
    .insert(requestItemData)
    .select();

  if (orderItemRes.error) {
    const msg =
      orderItemRes.error.message ?? "요청이 정상적으로 처리되지 않았습니다.";
    throw new Error(msg);
  }

  return orderItemRes;
}
