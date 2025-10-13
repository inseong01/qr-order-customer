import { OrderProps } from "@/lib/supabase/function/post-order-list";
import { useBoundStore } from "@/lib/store/use-bound-store";

import { orderListQueryOption } from "@/lib/function/query/query-option";
import { useOrderMutationQuery } from "@/lib/function/query/mutation";
import { menuMapping } from "@/lib/function/(router)/menu/menu-mapping";

import { Button, ButtonBox } from "../modal-type";
import { DialogBackDrop, DialogFrame, ModalHeadTitle } from "../modal-type";

import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";

type OrderConfirmProps = {};

export default function OrderConfirmModal({}: OrderConfirmProps) {
  const table = useBoundStore((state) => state.tableState);
  const orderMenuList = useBoundStore((state) => state.orderState.list);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const isModalOpen = useBoundStore((state) => state.modalState.isOpen);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const setFetchSucceeded = useBoundStore((state) => state.setFetchSucceeded);
  const setNexPageEnable = useBoundStore((state) => state.setNexPageEnable);

  const queryClient = useQueryClient();
  const orderMutation = useOrderMutationQuery();

  // 예
  function submitYES() {
    if (isSubmit) return;
    if (!table.id) return;

    const order: OrderProps = {
      id: uuidv4(),
      table_id: table.id,
      menu: orderMenuList,
    };

    const orderListQueryKey = orderListQueryOption(table.number!).queryKey;

    orderMutation.mutate(order, {
      onSuccess() {
        setFetchSucceeded({ isSuccess: true });
        queryClient.setQueryData(orderListQueryKey, (oldData) => {
          const newData = menuMapping(orderMenuList, order.id, table.number!);
          return [...newData, ...(oldData ?? [])];
        });
      },
      onError() {
        setFetchSucceeded({ isSuccess: false });
      },
      onSettled() {
        setModalOpen({ isOpen: false });
        setTimeout(() => setNexPageEnable({ isNext: true }), 400);
      },
    });
  }

  // 아니요
  function submitNO() {
    setModalOpen({ isOpen: false });
  }

  if (orderMutation.isPending)
    return (
      <div className={`fixed top-0 left-0 z-9999 h-full w-full bg-white/30`}>
        <div className={"absolute top-1/2 left-1/2 -translate-1/2"}>
          <div className={"loader"}></div>
        </div>
      </div>
    );

  return (
    <AnimatePresence>
      <DialogFrame key={"DialogFrame"} id="orderCheck" isOpen={isModalOpen}>
        <ModalHeadTitle title={"주문하시겠습니까?"} />

        <ButtonBox>
          <Button title="아니요" onClick={submitNO} />
          <Button title="예" onClick={submitYES} />
        </ButtonBox>
      </DialogFrame>

      {isModalOpen && <DialogBackDrop key={"DialogBackDrop"} />}
    </AnimatePresence>
  );
}
