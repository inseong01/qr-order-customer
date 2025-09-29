import { useBoundStore } from "@/lib/store/use-bound-store";
import { orderListQueryOption } from "@/lib/function/query/query-option";

import OrderListDisplay from "./display-order";
import MainTagFrame from "../../components/frame/main/main-index";
import VerticalStackGroup from "../../components/vertical-stack/stack-index";
import ExceptionMessage from "../../components/exception/show-message/message-index";
import Divider from "../../components/line/line-index";

import { useQueryClient } from "@tanstack/react-query";

export default function OrderHistory() {
  const tableName = useBoundStore((state) => state.tableState.tableName);

  const queryClient = useQueryClient();
  const orderListQuery = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );

  const orderList = {
    data: orderListQuery?.data ?? [],
    status: orderListQuery?.status ?? "pending",
  };
  const orders = orderList.status === "success" ? orderList.data : [];

  return (
    <MainTagFrame>
      <VerticalStackGroup tag="ul" gap="gap-5">
        {orderList.status !== "success" ? (
          <ErrorComp isServerError={orderList.status === "error"} />
        ) : (
          <OrderListDisplay orders={orders} />
        )}
      </VerticalStackGroup>
    </MainTagFrame>
  );
}

/**
 * OrderList 컴포넌트가 하나의 목록으로 생성되기 때문에
 * 컴포넌트 자체를 재생성해야 함
 */
function ErrorComp({ isServerError }: { isServerError: boolean }) {
  const title = isServerError ? "주문 내역 오류" : "주문 내역";

  return (
    <VerticalStackGroup tag="li" gap="gap-5">
      <VerticalStackGroup tag="div" gap="gap-2.5">
        <p>{title}</p>
        <Divider />
      </VerticalStackGroup>

      <ExceptionMessage domain="history" isServerError={isServerError} />
    </VerticalStackGroup>
  );
}
