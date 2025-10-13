"use client";

import { useBoundStore } from "@/lib/store/use-bound-store";
import { calculateTotalPrice } from "@/lib/function/(router)/calculateTotalPrice";

import Divider from "@/feature/table/(router)/components/line/line-index";
import MenuList from "@/feature/table/(router)/components/main/display/menu-list/list-index";
import DisplayTotalPrice from "@/feature/table/(router)/components/main/display/total-price/price-index";
import VerticalStackGroup from "@/feature/table/(router)/components/vertical-stack/stack-index";

import { EmptyListComponent } from "../next-index";

import { useQueryClient } from "@tanstack/react-query";
import { OrderList } from "@/types/table";
import { useMemo } from "react";

export default function ProcessedOrderList() {
  const orderMenuList = useBoundStore((state) => state.orderState.list);

  const queryClient = useQueryClient();
  const orderData = queryClient.getQueryData(["orderList"]) as OrderList[];

  // 메인 메뉴 돌아갈 때 초기화 되는 문제로 주문목록 개수 기억
  const menuListAmount = useMemo(() => orderMenuList.length, []);
  const list = orderData.slice(0, menuListAmount);

  if (!list.length) return <EmptyListComponent />;

  const totalPrice = list.reduce(calculateTotalPrice, 0);
  const totalPriceToString = totalPrice.toLocaleString();

  return (
    <>
      <VerticalStackGroup tag="div" gap="gap-5">
        <MenuList orders={list} />
      </VerticalStackGroup>

      <Divider />

      <DisplayTotalPrice title="결제금액" price={totalPriceToString} />
    </>
  );
}
