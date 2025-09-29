"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";
import { orderListQueryOption } from "@/lib/function/query/query-option";
import { calculateTotalPrice } from "@/lib/function/(router)/calculateTotalPrice";
import Divider from "@/feature/table/(router)/components/line/line-index";
import MenuList from "@/feature/table/(router)/components/main/display/menu-list/list-index";
import DisplayTotalPrice from "@/feature/table/(router)/components/main/display/total-price/price-index";
import VerticalStackGroup from "@/feature/table/(router)/components/vertical-stack/stack-index";

import { useQueryClient } from "@tanstack/react-query";

export default function ProcessedOrderList() {
  const tableName = useBoundStore((state) => state.tableState.tableName);

  const queryClient = useQueryClient();
  const orderListQuery = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );

  if (!orderListQuery?.data) return <EmptyListComponent />;

  const latestOrder = orderListQuery.data[0];
  const totalPrice = [latestOrder].reduce(calculateTotalPrice, 0);
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <>
      <VerticalStackGroup tag="div" gap="gap-5">
        <MenuList orders={[latestOrder]} />
      </VerticalStackGroup>

      <Divider />

      <DisplayTotalPrice title="결제금액" price={totalPriceToString} />
    </>
  );
}

function EmptyListComponent() {
  return <div className={"text-[#959595]"}>접수된 주문이 없습니다.</div>;
}
