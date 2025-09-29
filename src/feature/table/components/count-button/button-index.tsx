"use client";

import calculateAmount from "@/lib/function/count-button/calculate-amount";
import { useBoundStore } from "@/lib/store/use-bound-store";
import { Request, SelectedMenu } from "@/types/common";

import { CountButtonType, IconType } from "./types";
import SimpleIcon from "../simple-icon/icon-index";

export default function CountButton({
  type,
  amount,
  id,
}: {
  type: CountButtonType;
  amount: number;
  id: number | string;
}) {
  const changeRequestAmount = useBoundStore(
    (state) => state.changeRequestAmount,
  );
  const changeMenuAmount = useBoundStore((state) => state.changeMenuAmount);
  const changeMenuAmountInList = useBoundStore(
    (state) => state.changeMenuAmountInList,
  );

  // 항목 수량 변경
  function onClickMenuCount(num: number) {
    return () => {
      // 수량 1개 이하 제한
      const calcedAmount = calculateAmount(amount, num);
      if (calcedAmount === amount) return;

      switch (type) {
        case "pick": {
          changeMenuAmount({ amount: calcedAmount });
          break;
        }
        case "call": {
          const ItemId = id as Request["id"];
          changeRequestAmount({ id: ItemId, amount: calcedAmount });
          break;
        }
        case "pickUpList": {
          const listId = id as SelectedMenu["id"];
          changeMenuAmountInList({ id: listId, amount: calcedAmount });
          break;
        }
        default: {
          throw new Error("Type is undefined!");
        }
      }
    };
  }

  return (
    <div
      className={
        "flex h-auto cursor-default items-center rounded-sm border-[1px] border-[#e6e6e6]"
      }
    >
      <CountIconBox onClick={onClickMenuCount(-1)} type="minus" />
      <DisplayAmount amount={amount} />
      <CountIconBox onClick={onClickMenuCount(1)} type="plus" />
    </div>
  );
}

function DisplayAmount({ amount }: { amount: number }) {
  return (
    <div className={"flex w-7 items-center justify-center"}>
      <span>{amount}</span>
    </div>
  );
}

function CountIconBox({
  onClick,
  type,
}: {
  onClick: () => void;
  type: IconType;
}) {
  return (
    <div
      className={"box-content h-6 w-5 cursor-pointer px-2 py-0.5"}
      onClick={onClick}
    >
      <SimpleIcon type={type} />
    </div>
  );
}
