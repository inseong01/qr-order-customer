"use client";

import { orderListQueryOption } from "@/lib/function/query/query-option";
import { useQueryClient } from "@tanstack/react-query";
import { useBoundStore } from "@/lib/store/use-bound-store";

import Bill from "./display-bill";
import MainTagFrame from "../../components/frame/main/main-index";
import VerticalStackGroup from "../../components/vertical-stack/stack-index";
import ExceptionMessage from "../../components/exception/show-message/message-index";

import { ReactNode } from "react";

export default function BillPageMain() {
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
      <VerticalStackGroup tag="div" gap="gap-5">
        <div
          className={"flex flex-col gap-1 text-center text-xs text-[#959595]"}
        >
          <span>결제는 후불입니다.</span>
          <span>현재 앉아 계신 테이블 번호는 {tableName}번 입니다.</span>
        </div>

        <BillBox>
          {orderList.status !== "success" ? (
            <ExceptionMessage
              domain="bill"
              isServerError={orderList.status === "error"}
            />
          ) : (
            <Bill orders={orders} />
          )}
        </BillBox>
      </VerticalStackGroup>
    </MainTagFrame>
  );
}

function BillBox({ children }: { children: ReactNode }) {
  return (
    <div
      className={
        "flex h-auto w-full cursor-default flex-col gap-4 rounded border-[1px] border-[#c9c9c9] px-8 py-6"
      }
    >
      {children}
    </div>
  );
}
