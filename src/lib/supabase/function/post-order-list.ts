import { InsertOrderList, SelectedMenu } from "@/types/common";
import { createClient } from "../client";

export default async function postOrderList(
  tableName: number,
  orderList: SelectedMenu[],
) {
  const insertData: InsertOrderList = { tableNum: tableName, orderList };
  const response = await createClient()
    .from("qr-order-allOrderList")
    .insert(insertData)
    .select();
  if (response.error) {
    const msg =
      response.error.message ?? "주문이 정상적으로 처리되지 않았습니다.";

    console.error(msg);

    // 조건문을 통해 에러를 판별, 에러 던지지 않음
    return { error: { message: msg } };
  }
  return response;
}
