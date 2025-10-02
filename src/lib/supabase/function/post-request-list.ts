import { InsertRequestList } from "@/types/common";
import { createClient } from "../client";

export default async function postRequestList(
  tableName: number,
  requestList: string,
) {
  const insertData: InsertRequestList = { tableNum: tableName, requestList };
  const response = await createClient()
    .from("qr-order-request-list")
    .insert(insertData)
    .select();
  if (response.error) {
    const msg =
      response.error.message ?? "요청사항이 정상적으로 처리되지 않았습니다.";

    console.error(msg);

    // 조건문을 통해 에러를 판별, 에러 던지지 않음
    return { error: { message: msg } };
  }
  return response;
}
