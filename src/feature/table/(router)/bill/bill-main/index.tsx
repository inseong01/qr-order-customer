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
  const { data, status } = queryClient.getQueryState(
    orderListQueryOption(tableName).queryKey,
  );

  const error = { orderList: !data, staus: status === "error" };
  const isError = Object.values(error).some((value) => value);
  const errorType = Object.entries(error).filter(
    ([_, value]) => value === true,
  );
  const orderListArr = isError ? [] : data;

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
          {isError ? (
            <ErrorComp errorType={errorType[0]} />
          ) : (
            <Bill orderItems={orderListArr} />
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

function ErrorComp({ errorType }: { errorType: [string, boolean] }) {
  const [key] = errorType;
  const isServerError = key === "status";

  return <ExceptionMessage domain="bill" isServerError={isServerError} />;
}
