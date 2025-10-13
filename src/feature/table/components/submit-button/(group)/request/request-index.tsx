import { Request } from "@/types/common";
import { useBoundStore } from "@/lib/store/use-bound-store";
import { useRequestMutationQuery } from "@/lib/function/query/mutation";
import CountButton from "../../../count-button/button-index";

import { v4 as uuidv4 } from "uuid";

// Top
export function PickAndCountButton() {
  const selectedArr = useBoundStore(
    (state) => state.callState.selectedRequests,
  );

  return (
    <div className={"h-auto w-full"}>
      <ul className={"flex w-full flex-col gap-4"}>
        {selectedArr.map((item, idx) => (
          <PickItem key={idx} item={item} />
        ))}
      </ul>
    </div>
  );
}

function PickItem({ item }: { item: Request }) {
  return (
    <li className={"flex h-6 w-full items-center justify-between gap-4"}>
      <div>{item.title}</div>

      {item.title !== "직원호출" && (
        <CountButton type={"call"} quantity={item.quantity} id={item.id} />
      )}
    </li>
  );
}

// Bottom
export function SubmitRequest() {
  const requestArr = useBoundStore((state) => state.callState.selectedRequests);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const tableId = useBoundStore((state) => state.tableState.id);
  const setModalOpen = useBoundStore((state) => state.setModalOpen);
  const setFetchSucceeded = useBoundStore((state) => state.setFetchSucceeded);

  const requestMutation = useRequestMutationQuery();

  function submitYES() {
    if (isSubmit) return;

    const data = {
      id: uuidv4(),
      // tableId 없을 시 mutation 오류 발생 의도
      tableId: tableId!,
      list: requestArr,
    };

    requestMutation.mutate(data, {
      onSuccess() {
        setFetchSucceeded({ isSuccess: true });
      },
      onError() {
        setFetchSucceeded({ isSuccess: false });
      },
      onSettled() {
        setModalOpen({ isOpen: true });
      },
    });
  }

  return (
    <button
      className={
        "flex h-full w-full cursor-pointer items-center justify-center p-4"
      }
      onClick={submitYES}
    >
      요청하기
    </button>
  );
}
