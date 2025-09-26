import { OrderItem } from "@/types/common";

import { useBoundStore } from "@/lib/store/use-bound-store";
import { orderListQueryOption } from "@/lib/function/query/query-option";

import OrderList from "./display-order";
import MainTagFrame from "../../components/frame/main/main-index";
import VerticalStackGroup from "../../components/vertical-stack/stack-index";
import ExceptionMessage from "../../components/exception/show-message/message-index";
import Divider from "../../components/line/line-index";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function OrderHistory() {
  const tableName = useBoundStore((state) => state.tableState.tableName);

  const queryClient = useQueryClient();
  const orderList = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );

  const [orderListArr, setListArr] = useState<OrderItem[]>([]);

  const error = { list: !orderList, staus: orderList?.status === "error" };
  const isError = Object.values(error).some((value) => value);
  const errorType = Object.entries(error).filter(
    ([key, value]) => value === true,
  );

  // 프리패치 후 최신순 정렬
  useEffect(() => {
    if (!orderList?.data) return;

    function sortDesc(a: OrderItem["created_at"], b: OrderItem["created_at"]) {
      const at = new Date(b.created_at).getTime();
      const bt = new Date(a.created_at).getTime();
      return at - bt;
    }

    setListArr(orderList.data.sort(sortDesc));
  }, [orderList]);

  return (
    <MainTagFrame>
      <VerticalStackGroup tag="ul" gap="gap-5">
        {isError ? (
          <ErrorComp errorType={errorType[0]} />
        ) : (
          <OrderList orderListArr={orderListArr} />
        )}
      </VerticalStackGroup>
    </MainTagFrame>
  );
}

/**
 * OrderList 컴포넌트가 하나의 목록으로 생성되기 때문에
 * 컴포넌트 자체를 재생성해야 함
 */
function ErrorComp({ errorType }: { errorType: [string, boolean] }) {
  const [key] = errorType;
  const isServerError = key === "status";
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
